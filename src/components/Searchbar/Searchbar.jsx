import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { BiSearch } from 'react-icons/bi';
import { Header, StyledForm, SearchButton, Input, ErrorText } from './Searchbar.styled';

const schema = yup.object().shape({
  searchQuery: yup.string().required(),
});

const FormError = ({ name }) => {
  return <ErrorMessage name={name} render={message => <ErrorText>{"It's a required field"}</ErrorText>} />;
};

const initialValues = {
  searchQuery: '',
};

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = ({ searchQuery }, { resetForm }) => {
    if (searchQuery.trim() === '') {
      alert('Enter a search query!');
      return;
    }
    onSubmit(searchQuery);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Header>
        <StyledForm>
          <SearchButton type="submit">
            <BiSearch size="25" />
          </SearchButton>

          <Input
            type="text"
            name="searchQuery"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <FormError name="searchQuery" />
        </StyledForm>
      </Header>
    </Formik>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
