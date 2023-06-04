import React from "react";

import "./PublicationDetails.style.scss";

interface PublicationDetails {
  updateDate: string;
}

const PublicationDetails = (props: PublicationDetails) => {
  const { updateDate } = props;

  const lastUpdate = new Date(updateDate);

  return (
    <div>
      <div className="publication_details">
        <p className="publication_details__author">Autor: topio.pl</p>
        <span className="publication_details__divider" />
        <span className="publication_details__date">Data publikacji: {lastUpdate.toISOString().split("T")[0]}</span>
      </div>
    </div>
  );
};

export default PublicationDetails;
