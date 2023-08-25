import { useState } from 'react';
import Modal from './Modal';
import Pagination from './Pagination';
import { contactList } from '../styles/style';

interface PhoneType {
  number: string;
}

interface ContactType {
  id: number;
  first_name: string;
  last_name: string;
  phones: PhoneType[];
}

interface ContactProps {
  List: ContactType[];
  search: string;
}

const ContactList = ({ List, search }: ContactProps) => {
  const [contactId, setContactId] = useState<number>(0);
  const [modal, setModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = 10;
  const lastContactIndex = currentPage * perPage;
  const firstContactIndex = lastContactIndex - perPage;

  // Initialize favorite contacts array
  const [favoriteContacts, setFavoriteContacts] = useState<number[]>([]);

  function openModal(id: number) {
    setModal(true);
    setContactId(id);
  }

  function closeModal() {
    setModal(false);
  }

  const filteredContactList = List.filter(
    (data: ContactType) => data.first_name.toLocaleLowerCase().includes(search) || data.last_name.toLocaleLowerCase().includes(search) || data.phones.some((phone: PhoneType) => phone.number === search)
  );

  const toggleFavorite = (contactId: number) => {
    if (favoriteContacts.includes(contactId)) {
      setFavoriteContacts(favoriteContacts.filter((id) => id !== contactId));
    } else {
      setFavoriteContacts([...favoriteContacts, contactId]);
    }
  };

  const favoriteContactList = filteredContactList.filter((contact) => favoriteContacts.includes(contact.id));
  const normalContactList = filteredContactList.filter((contact) => !favoriteContacts.includes(contact.id));

  const currentFavoriteContacts = favoriteContactList.slice(firstContactIndex, lastContactIndex);
  const currentNormalContacts = normalContactList.slice(firstContactIndex, lastContactIndex);

  return (
    <div css={contactList}>
      {currentPage === 1 && (
        <div css={contactList}>
          <h3 className="title">Favorite Contacts</h3>
          {currentFavoriteContacts.length > 0 ? (
            currentFavoriteContacts.map((contact: ContactType) => (
              <button
                key={contact.id}
                onClick={() => {
                  toggleFavorite(contact.id);
                  openModal(contact.id);
                }}
                className={`contact favorite`}
              >
                {contact.first_name}
              </button>
            ))
          ) : (
            <p>No favorite contacts</p>
          )}
        </div>
      )}
      <h3 className="title">Contacts</h3>
      {currentNormalContacts.length > 0 ? (
        currentNormalContacts.map((contact: ContactType) => (
          <button
            key={contact.id}
            onClick={() => {
              openModal(contact.id);
            }}
            className={`contact`}
          >
            {contact.first_name}
          </button>
        ))
      ) : (
        <p>No normal contacts</p>
      )}
      <Pagination totalContact={filteredContactList.length} perPage={perPage} setCurrentPage={setCurrentPage} />
      {modal && <Modal close={closeModal} contactId={contactId} handleFav={toggleFavorite} />}
    </div>
  );
};

export default ContactList;
