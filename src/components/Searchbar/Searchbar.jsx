import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { BiSearch } from 'react-icons/bi';
import { Header, StyledForm, SearchButton, Input } from './Searchbar.styled';

const schema = yup.object().shape({
  searchQuery: yup.string().required(),
});

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
          <ErrorMessage name="searchQuery" component="div" />
        </StyledForm>
      </Header>
    </Formik>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
