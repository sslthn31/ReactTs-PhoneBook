import { useMutation, useQuery } from '@apollo/client';
import { DELETE_CONTACT, GET_DETAIL_CONTACT } from '../query';
import { useState } from 'react';
import { contentStyles, modalWithAnimation, modalStyles } from '../styles/style';
import { FormEdit } from './Form';

type ModalProps = {
  close: () => void;
  contactId: number;
  handleFav: (id: number) => void;
};
type PhoneData = {
  number: number;
};
type ModalConfirmProps = {
  close: () => void;
  handleDelete: () => void;
};

const Modal = ({ close, contactId, handleFav }: ModalProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const { loading, error, data } = useQuery(GET_DETAIL_CONTACT, {
    variables: { id: contactId },
  });
  // console.log(data, "data");

  const [deleteContact] = useMutation(DELETE_CONTACT);
  function closeModal() {
    setOpenModal(false);
  }
  function handleCloseModalEdit() {
    setOpenModalEdit(false);
  }
  const handleDelete = async () => {
    try {
      await deleteContact({ variables: { id: contactId } });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div css={modalWithAnimation}>
      <div css={contentStyles}>
        <h2>Detail Contact</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <div className="modalContent">
            <h3>{data.contact_by_pk.id}</h3>
            <h3>
              {data.contact_by_pk.first_name} {data.contact_by_pk.last_name}
            </h3>
            <h4>Phones :</h4>
            <ul>
              {data.contact_by_pk.phones.map((data: PhoneData, index: number) => {
                return <li key={index}>{data.number}</li>;
              })}
            </ul>
          </div>
        )}
        <div className="buttons">
          <button onClick={() => handleFav(data.contact_by_pk.id)}>Favorite</button>
          <button onClick={() => setOpenModalEdit(true)}>Edit</button>
          <button onClick={() => setOpenModal(true)}>Delete</button>
          <button onClick={close}>Close</button>
        </div>
      </div>
      {openModal && <ModalConfirm close={closeModal} handleDelete={handleDelete} />}
      {openModalEdit && <FormEdit handleCloseModal={handleCloseModalEdit} contactData={data.contact_by_pk} />}
    </div>
  );
};

const ModalConfirm = ({ handleDelete, close }: ModalConfirmProps) => {
  return (
    <div css={modalStyles}>
      <div css={contentStyles}>
        <h4>Are You Sure ?</h4>

        <div className="buttons">
          <button onClick={handleDelete}>Yes</button>
          <button onClick={close}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
