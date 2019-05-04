import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';


const curState = { items: [], text: '' };
const reducer = (state = curState, action) => {
  switch (action.type) {
    case 'handleSubmit':
      return state = (function () {
        if (!state.text.length) {
          return state
        }
        const newItems = {
          text: state.text,
          id: Date.now()
        }
        state = {
          items: state.items.concat(newItems),
          text: state.text
        }
        return state;
      }());
    case 'handleDelete':
      return state = (function () {
        state.items = state.items.filter((items) => {
          return items.id !== action.id;
        })
        return state;
      }());
      case 'inputChange':
        state.text = action.text
        return state
    default: return state;
  }
}
const store = createStore(reducer);

function Counter(props) {
  return (<ul>
    {props.items.map(items => (
      <li key={items.id}
        onClick={props.handleDelete}
      >{items.text}</li>
    ))}
  </ul>);

}
class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmit()
  }
  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            id='new-Todo'
            onChange={(e) => {
              store.dispatch({
                type: 'inputChange',
                text: e.target.value
              })
            }}
          />
          <button type="submit">
            ADD
      </button>
          <Counter items={store.getState().items}
            handleDelete={() => store.dispatch({ type: 'handleDelete', id: store.getState().items[0].id })}
          />
        </form>
      </div>
    );
  }
}

const render = () => {
  const handleSubmit = () => {
    store.dispatch({ type: 'handleSubmit' });
  }
  ReactDOM.render(
    <TodoList
      handleSubmit={handleSubmit}
    />,
    document.getElementById('root')
  );
}
render();
store.subscribe(render);

//创建三个方法，用于去处理整个todolist
//submit,change,delete,change方法写在，，，其余两个方法写在reducer里面。
//书写两个组件，第一个组件用来todolist,第二个组件，用来输出整个的todoapp
//整个过程所涉及到的步骤分别有，第一个，创建一个reducer，来实现其中的两个方法。其中需要注意的就是reducer中的参数和所返回回来的对象
//第二个就是todolist中，如何去绑定组件中的方法，并且将之与当前状态的store给联系起来
//第三就是在todoapp中，怎样去实现整个的事件绑定，如何将与当前的state联系起来。

