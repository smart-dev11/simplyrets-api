import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Favorite } from '@material-ui/icons';
import Property from '../components/Property';
import { mockPropertiesList } from '../utils/constant';

let props;
let handleClickProperty;
describe('<Property />', () => {
  beforeEach(() => {
    handleClickProperty = jest.fn();
    props = {
      property: mockPropertiesList[0],
      clickedList: {},
      handleClickProperty
    };
  });

  it('should render Property successfully', () => {
    render(<Property {...props} />);

    expect(
      screen.getByText(`${mockPropertiesList[0].property.bedrooms} BR`)
    ).toBeInTheDocument();
    expect(screen.getByTestId('FavoriteOutlined')).toBeInTheDocument();
    expect(screen.getByText(mockPropertiesList[0].address.full)).toBeInTheDocument();
  });

  it('should call clickHandler when click favorite icon button', () => {
    render(<Property {...props} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClickProperty).toHaveBeenCalledTimes(1);
  });

  it('should display Favorite Icon when it has already clicked', () => {
    props.clickedList = {
      [mockPropertiesList[0].mlsId]: true
    };
    render(<Property {...props} />);

    expect(screen.getByTestId('Favorite')).toBeInTheDocument();
  });
});
