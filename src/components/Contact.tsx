import { useState } from 'react';
import { GET_ALL_CONTACT } from '../query';
import { useQuery } from '@apollo/client';
import InputSearch from './InputSearch';
import ContactList from './ContactList';
import { Form } from './Form';
import Loading from './Loading';
import { mainLayout } from '../styles/style';

const Contact = () => {
  const { loading, error, data } = useQuery(GET_ALL_CONTACT);
  const [search, setSearch] = useState<string>('');
  const [addDataModal, setAddDataModal] = useState<boolean>(false);
  const [formAlert, setFormAlert] = useState<string | null | undefined>(null);
  function handleCloseModal() {
    setAddDataModal(false);
  }
  setTimeout(() => {
    setFormAlert(null);
  }, 3000);
  if (loading) return <Loading />;
  if (error) return <div>Error....</div>;

  return (
    <div css={mainLayout}>
      {formAlert && <h3>{formAlert}</h3>}
      <InputSearch setSearch={setSearch} />
      <div className="button-add">
        <button onClick={() => setAddDataModal(true)}>Add Contact</button>
      </div>
      <ContactList List={data.contact} search={search} />
      {addDataModal && <Form contactData={data.contact} handleCloseModal={() => handleCloseModal()} setFormAlert={setFormAlert} />}
    </div>
  );
};

export default Contact;
