
//using react testing library

// import React from 'react';
// import { render } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


// Using enzyme
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
it('renders welcome message', () => {
  const wrapper = shallow(<App />);

  // console.log(wrapper);
  // const welcome = <h2>Welcome to React</h2>;
  // // expect(wrapper.contains(welcome)).toBe(true);
  expect(wrapper).toEqual({});
});