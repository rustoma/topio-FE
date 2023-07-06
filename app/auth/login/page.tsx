"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { z } from "zod";

import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";
import { Container } from "@/components/container/Container";
import { VALIDATORS } from "@/utils/valiadtors";

const loginFormSchema = z.object({
  userName: VALIDATORS.email("Podaj porawny email"),
  password: VALIDATORS.required("Pole jest wymagane"),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

const ContactPage = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [error, setError] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(undefined);
    try {
      const res = await signIn(
        "credentials",
        { user_name: data.userName, password: data.password, redirect: false },
        {}
      );

      if (res?.error) {
        if (res.error === "CredentialsSignin") {
          setError("Dane logowania są niepoprawne.");
          reset();
          return;
        }

        setError("Oops, mamy problemy techniczne. Staramy się je naprawić najszybciej jak to możlwie.");
        reset();
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.log({ error });
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div>
        {`Jesteś zalogowany jako: ${session.user?.name}`}
        <div>
          <button onClick={() => signOut()}>Wyloguj</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <main>
        <Breadcrumbs />
        <Container>
          {error && <div>{error}</div>}

          <h2>Zaloguj się</h2>

          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="userName">Nazwa użytkownika</label>
              <div>
                <input id="userName" {...register("userName")} />
              </div>
              {errors.userName?.message && <p>{errors.userName?.message?.toString()}</p>}
            </div>
            <div>
              <label htmlFor="password">Hasło</label>
              <div>
                <input id="password" {...register("password")} />
              </div>
              {errors.password?.message && <p>{errors.password?.message?.toString()}</p>}
            </div>
            <input type="submit" />
          </form>
        </Container>
      </main>
    </>
  );
};

export default ContactPage;
