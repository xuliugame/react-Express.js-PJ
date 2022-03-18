import { shallow } from 'enzyme';
import Item from './Item';

describe('Item', () => {
  it('render item', async () => {
    const wrapper = shallow(<Item data={{
      Name: 'Emilia',
      Email: 'emilia@re.0',
      Age: 16,
      Status: true,
      Class: ['sleep']
    }}/>);
    // infos
    expect(wrapper.contains(<div>Name: Emilia</div>)).toBe(true);
    expect(wrapper.contains(<div>Email: emilia@re.0</div>)).toBe(true);
    expect(wrapper.contains(<div>Age: 16</div>)).toBe(true);
    expect(wrapper.contains(<div>Status: true</div>)).toBe(true);
    expect(wrapper.contains(<div>Class: sleep</div>)).toBe(true);

    // buttons
    expect(wrapper.find('button').length).toBe(2);
  });
});
