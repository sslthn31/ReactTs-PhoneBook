import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_DETAIL_CONTACT } from '../query';
const ContactDetail = ({ contactId }) => {
  const { loading, error, data } = useQuery(GET_DETAIL_CONTACT, {
    variables: { id: contactId },
  });
  console.log(data, 'data by id');

  return <div>ContactDetail</div>;
};

export default ContactDetail;
