import { shallow } from 'enzyme';
import App from './App';
import Form from './components/Form';
import Item from './components/Item';

describe('App', () => {
  it('render form', async () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find(Form).length).toBe(1);
  });

  it('render item', async () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find(Item).length).toBe(0);
  });

  it('render search input', async () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find('input').length).toBe(1);
  });
});
