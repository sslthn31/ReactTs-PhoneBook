import React, { useState } from 'react';
import { ADD_CONTACT_WITH_PHONES, EDIT_CONTACT } from '../query';
import { useMutation } from '@apollo/client';
import { contentStyles, modalWithAnimation } from '../styles/style';

type ContactType = {
  id: number;
  first_name: string;
  last_name: string;
  phones: Array<{ number: string }>;
};
interface FormProps {
  contactData?: ContactType;
  handleCloseModal: () => void;
  setFormAlert?: (msg: string) => void;
}
export const Form = ({ contactData, handleCloseModal, setFormAlert }: FormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(['']);

  const [addContact] = useMutation(ADD_CONTACT_WITH_PHONES, {
    onError(error) {
      if (setFormAlert) setFormAlert(error?.message);
    },
  });

  const handlePhoneNumberChange = (index: number, value: string) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index] = value;
    setPhoneNumbers(updatedPhoneNumbers);
  };
  const addPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, '']);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const fullNameToCheck = `${firstName} ${lastName}`.toLowerCase();
      if (contactData && `${contactData.first_name} ${contactData.last_name}`.toLowerCase() === fullNameToCheck) {
        if (setFormAlert) return setFormAlert('A contact with the same name already exists.');
      }
      // eslint-disable-next-line no-useless-escape
      const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/]/;
      if (specialCharacterRegex.test(firstName) || specialCharacterRegex.test(lastName)) {
        if (setFormAlert) return setFormAlert('Names should not contain special characters.');
      }
      await addContact({
        variables: {
          first_name: firstName,
          last_name: lastName,
          phones: phoneNumbers.filter((number) => number.trim() !== '').map((number) => ({ number })),
        },
      });
      if (setFormAlert) setFormAlert('Added Contact Success');
      //   handleCloseModal();
    } catch (error) {
      console.error('Error adding contact:', error);
      //   setFormAlert('Phone Number Aleready Exist');
      // Optionally, you can show an error message here
    }
  };
  return (
    <div>
      <div css={modalWithAnimation}>
        <form onSubmit={handleSubmit} css={contentStyles}>
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          {phoneNumbers.map((number, index) => (
            <input key={index} type="text" placeholder="Phone Number" value={number} onChange={(e) => handlePhoneNumberChange(index, e.target.value)} />
          ))}
          <button onClick={addPhoneNumber}>Add Phone Number</button>
          <button type="submit">Add Contact</button>
          <button onClick={handleCloseModal}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export const FormEdit = ({ contactData, handleCloseModal, setFormAlert }: FormProps) => {
  const [initialFirstName, setInitialFirstName] = useState(contactData?.first_name || '');
  const [initialLastName, setInitialLastName] = useState(contactData?.last_name || '');
  const initialPhones = contactData?.phones.map((phone) => phone.number) ?? [];
  const [initialPhoneNumbers, setInitialPhoneNumbers] = useState<string[]>(initialPhones);
  const [editContact] = useMutation(EDIT_CONTACT, {
    onCompleted(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  const handlePhoneNumberChange = (index: number, value: string) => {
    const updatedPhoneNumbers = [...initialPhoneNumbers];
    updatedPhoneNumbers[index] = value;
    setInitialPhoneNumbers(updatedPhoneNumbers);
  };

  const addPhoneNumber = () => {
    setInitialPhoneNumbers([...initialPhoneNumbers, '']);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const fullNameToCheck = `${initialFirstName} ${initialLastName}`.toLowerCase();
      if (contactData && `${contactData.first_name} ${contactData.last_name}`.toLowerCase() === fullNameToCheck) {
        if (setFormAlert) return setFormAlert('A contact with the same name already exists.');
      }
      // eslint-disable-next-line no-useless-escape
      const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/]/;
      if (specialCharacterRegex.test(initialFirstName) || specialCharacterRegex.test(initialLastName)) {
        if (setFormAlert) return setFormAlert('Names should not contain special characters.');
      }
      console.log(
        initialFirstName,
        initialLastName,
        initialPhoneNumbers.map((number) => ({ number })),
        contactData?.id
      );

      await editContact({
        variables: {
          id: contactData?.id,
          _set: {
            first_name: initialFirstName,
            last_name: initialLastName,
            // phones: initialPhoneNumbers.filter((number) => number.trim() !== '').map((number) => ({ number })),
          },
        },
      });
      if (setFormAlert) setFormAlert('Added Contact Success');
      //   handleCloseModal();
    } catch (error) {
      console.error('Error adding contact:', error);
      //   setFormAlert('Phone Number Aleready Exist');
      // Optionally, you can show an error message here
    }
  };

  return (
    <div>
      <div css={modalWithAnimation}>
        <form onSubmit={handleSubmit} css={contentStyles}>
          <input type="text" placeholder="First Name" value={initialFirstName} onChange={(e) => setInitialFirstName(e.target.value)} />
          <input type="text" placeholder="Last Name" value={initialLastName} onChange={(e) => setInitialLastName(e.target.value)} />
          {initialPhoneNumbers.map((number, index) => (
            <input key={index} type="text" placeholder="Phone Number" value={number} onChange={(e) => handlePhoneNumberChange(index, e.target.value)} />
          ))}
          <button onClick={addPhoneNumber}>Add Phone Number</button>
          <button type="submit">Edit Contact</button>
          <button onClick={handleCloseModal}>Cancel</button>
        </form>
      </div>
    </div>
  );
};
