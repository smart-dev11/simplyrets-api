import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import PropertiesList from '../page/PropertiesList';
import { mockPropertiesList, PROPERTIES_KEY } from '../utils/constant';
import useStateWithLocalStorage from '../utils/customHooks';

describe('<PropertiesList />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render no item when there are no properties on localStorage and from API', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue([])
    });
    render(<PropertiesList />);
    expect(await screen.queryByTestId('property')).toBeNull();
  });

  it('should render PropertiesList when fetch properties list successfully', async () => {
    renderHook(() => useStateWithLocalStorage([], PROPERTIES_KEY));
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockPropertiesList)
    });
    render(<PropertiesList />);

    expect(await screen.findAllByTestId('property')).toHaveLength(2);
  });

  it('should render PropertiesList when there are properties on localStorage', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue([])
    });
    renderHook(() => useStateWithLocalStorage(mockPropertiesList, PROPERTIES_KEY));
    render(<PropertiesList />);

    expect(await screen.findAllByTestId('property')).toHaveLength(2);
  });
});
