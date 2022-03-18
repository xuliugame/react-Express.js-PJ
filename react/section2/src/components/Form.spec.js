import { shallow } from 'enzyme';
import Form from './Form';

describe('Form', () => {
  it('render create form', async () => {
    const wrapper = shallow(<Form/>);
    expect(wrapper.contains(<h2>Create new user:</h2>)).toBe(true);
  });

  it('render edit form', async () => {
    const wrapper = shallow(<Form data={{ Name: 'emilia' }}/>);
    expect(wrapper.contains(<h2>Edit user:</h2>)).toBe(true);
  });

  it('render inputs', () => {
    const wrapper = shallow(<Form/>);
    expect(wrapper.find('input').length).toEqual(7);
  });
});
