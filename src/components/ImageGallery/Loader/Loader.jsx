import { RotatingLines } from 'react-loader-spinner';
import { Wrap } from './Loader.styled';

export const Spinner = () => (
  <Wrap>
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
  </Wrap>
);
