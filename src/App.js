import { useState, } from "react"
import './App.css';
import style from "./App.module.scss";

const timeTable = []

function createSlot(name, teacher) {
  return {
    name,
    teacher
  }
}

function createSlotMatrix () {
  const days = 6
  const slotsInDay = 6
  const slotMatrix = []
  for (let i = 0; i < days; i++) {
    const daySlots = []
    for (let j = 0; j < slotsInDay; j++) {
      daySlots.push(createSlot("教科", "教員"))
    }
    slotMatrix.push(daySlots)
  }
  return slotMatrix
}

function Form ({
  onSave
}) {
  const [name, setName] = useState("")
  const [teacher, setTeacher] = useState("")

  const onChangeName = (e) => {
    setName(e.target.value)
  }
  const onChangeTeacher = (e) => {
    setTeacher(e.target.value)
  }

  const onSaveClick = () => {
    onSave({
      name,
      teacher,
    })
    // window.alert(name + ":" + teacher)
  }

  return (
    <div>
      <div>
        <input placeholder="name" value={name} onChange={onChangeName}/>
      </div>
      <div>
        <input placeholder="teacher" value={teacher} onChange={onChangeTeacher}/>
      </div>
      <div>
        <button onClick={onSaveClick}>save</button>
      </div>
    </div>
  )
}

function App() {
  const [slotMatrix, setSlotMatrix] = useState(createSlotMatrix())
  const [dayIndex, setDayIndex] = useState(null)
  const [slotIndex, setSlotIndex] = useState(null)

  const onSlotClick = (dayIndex, slotIndex) => {
    setDayIndex(dayIndex)
    setSlotIndex(slotIndex)
  }

  const onSave = (data) => {
    const slot = slotMatrix[dayIndex][slotIndex]
    slot.name = data.name
    slot.teacher = data.teacher
    setSlotMatrix(slotMatrix.map(day => [...day]))
    setDayIndex(null)
    setSlotIndex(null)
  }

  return (
    <div className="App">
      { dayIndex !== null && slotIndex !== null && (
        <Form onSave={onSave}/>
      )}
      <table>
        {slotMatrix.map((day, i) => {
          return (
            <tr>
              {day.map((slot, j) => {
                return (
                  <td className={style.slot + " " + (dayIndex === i && slotIndex === j ? style.editing : "")} onClick={() => onSlotClick(i, j)}>
                    <div>{slot.name}</div>
                    <div>{slot.teacher}</div>
                  </td>
                )
              })}
            </tr>
          )
        })}
      </table>
    </div>
  );
}

export default App;
