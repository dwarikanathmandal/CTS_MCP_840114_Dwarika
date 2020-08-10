import React from 'react';
import { shallow, mount, render } from 'enzyme';
import PortfolioLayout from './PortfolioLayout';
import { Button } from 'reactstrap';

describe('Portfolio layout', () => {
    const wrapper = shallow(<PortfolioLayout />);
    it('should render component', () => {
        expect(wrapper).toBeTruthy();
    });

    // it('should render two buttons', () => {
    //     let buttons = wrapper.find(Button);
    //     expect(buttons).toHaveLength(2);
    // });
})
