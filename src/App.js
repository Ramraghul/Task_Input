import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [items, setItems] = useState([{ input: '', value: '', nestedInputs: [[]] }]);

  // const addNewItem = () => {
  //   setItems([...items, { input: '', value: '', nestedInputs: [[]] }]);
  // };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addNestedInput = (itemIndex, inputIndex) => {
    const newItems = [...items];
    newItems[itemIndex].nestedInputs[inputIndex].push('');
    setItems(newItems);
  };

  const removeNestedInput = (itemIndex, inputIndex, nestedInputIndex) => {
    const newItems = [...items];
    newItems[itemIndex].nestedInputs[inputIndex].splice(nestedInputIndex, 1);
    setItems(newItems);
  };

  const addNestedInputGroup = (itemIndex) => {
    const newItems = [...items];
    newItems[itemIndex].nestedInputs.push(['']);
    setItems(newItems);
  };

  const removeNestedInputGroup = (itemIndex, inputIndex) => {
    const newItems = [...items];
    newItems[itemIndex].nestedInputs.splice(inputIndex, 1);
    setItems(newItems);
  };

  const handleNestedInputChange = (itemIndex, inputIndex, nestedInputIndex, value) => {
    const newItems = [...items];
    newItems[itemIndex].nestedInputs[inputIndex][nestedInputIndex] = value;
    setItems(newItems);
  };

  return (
    <>
      <div style={{"justifyContent":"center"}}>
        <label htmlFor="Quiz">QuizName</label>
        <input id='Quiz' type="text" name="text" placeholder='Enter your Quest' />
      </div>
      <div>
        {items.map((item, itemIndex) => (
          <div key={itemIndex}>

            <label htmlFor="Question">{itemIndex+1}. Question</label>
            <input type="text" id='Question' value={item.value} onChange={(e) => updateItem(itemIndex, 'value', e.target.value)} placeholder="Value" />
            <button className='btn btn-primary' onClick={() => addNestedInputGroup(itemIndex)}>Add Question</button>

            {item.nestedInputs.map((nestedInputGroup, inputIndex) => (
              <div key={inputIndex}>
                {nestedInputGroup.map((nestedInput, nestedInputIndex) => (
                  <div key={nestedInputIndex}>
                    <label htmlFor="Question">{nestedInputIndex +1}. Question</label>
                    <input
                      type="text"
                      value={nestedInput}
                      onChange={(e) => handleNestedInputChange(itemIndex, inputIndex, nestedInputIndex, e.target.value)} placeholder="Nested Input" />
                    <button className='btn btn-warning' onClick={() => removeNestedInput(itemIndex, inputIndex, nestedInputIndex)}>
                      Remove Option
                    </button>
                  </div>
                ))}
                <button className='btn btn-success' onClick={() => addNestedInput(itemIndex, inputIndex)}>Add Options</button>
                <button className='btn btn-danger' onClick={() => removeNestedInputGroup(itemIndex, inputIndex)}>
                  Remove Total options
                </button>
              </div>
            ))}
          </div>
        ))}
        {/* <button className='btn btn-success' onClick={addNewItem}>Add Question</button> */}
      </div>
    </>
  );
}

export default App;
