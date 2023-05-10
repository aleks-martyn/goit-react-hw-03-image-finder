import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import {
  Header,
  StyledForm,
  SearchButton,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

const schema = yup.object().shape({
  searchQuery: yup.string().required(),
});

const initialValues = {
  searchQuery: '',
};

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = ({ searchQuery }, { resetForm }) => {
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
            <ButtonLabel>Search</ButtonLabel>
          </SearchButton>

          <Input
            type="text"
            name="searchQuery"
            autoComplete="false"
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
