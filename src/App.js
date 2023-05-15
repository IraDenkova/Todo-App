import styles from './app.module.css'
import 'normalize.css';
import "@fontsource/inter"
import "@fontsource/inter/100.css"
import "@fontsource/inter/500.css"
import { useState } from 'react'

import Paper from './images/paper.svg'

function App() {

  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [emptyPage, setEmptyPage] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [completedTasks, setCompletedTasks] = useState([])

  const date = new Date()
  const options = { weekday: 'long', day: 'numeric', month: 'short' }
  const formattedDate = date.toLocaleString('en-US', options)


  const handleAddTask = () => {
    if (newTask.trim() === '') {
      return
    }
    const formattedNewFask = newTask.charAt(0).toUpperCase() + newTask.slice(1)
    setTasks(prevTasks => [...prevTasks, formattedNewFask])
    setShowInput(false)
    setNewTask('')
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleAddTask()
    }
  }

  const handleCompleting = (index) => {
    setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, index]);
  }

  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div>
            <h2 className={styles.title}>{formattedDate}</h2>
            <p className={styles.subtitle}>
              {tasks.length}
              {tasks.length === 1 ? ' task' : ' tasks'}
            </p>
          </div>
          <button
            className={styles.addButton}
            onClick={() => { setShowInput(true); setEmptyPage(false) }}
          />
        </div>
        {emptyPage ? (
          <div className={styles.paperBox}>
            <img src={Paper} alt='notebook'/>
          </div>
        ) : (
          <div>
            {showInput &&
              <div className={styles.inputBox}>
                <input
                  autoFocus
                  className={styles.input}
                  type='text'
                  value={newTask}
                  onKeyDown={handleKeyDown}
                  onChange={e => setNewTask(e.target.value)}
                />
                <button
                  type="submit"
                  className={styles.setButton}
                  onClick={handleAddTask}>
                  Enter
                </button>
              </div>}
            <ul className={styles.tasksList}>
              {tasks.map((task, index) => (
                <li
                  className={styles.tasksItem}
                  key={index}
                  onMouseOver={() => setHoveredIndex(index)}
                  onMouseOut={() => setHoveredIndex(null)}
                  style={{
                    color: completedTasks.includes(index) ? 'grey' : 'black',
                    pointerEvents: completedTasks.includes(index) ? 'none' : 'fill'
                  }}>
                  {completedTasks.includes(index) && (
                    <span className={styles.line}></span>
                  ) }
                  <span>{task}</span>
                  {hoveredIndex === index && (
                    <button
                      className={styles.completedButton}
                      onClick={() => handleCompleting(index)}>
                      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5625 3.90625C1.13103 3.90625 0.78125 4.25603 0.78125 4.6875C0.78125 5.11897 1.13103 5.46875 1.5625 5.46875V3.90625ZM23.4375 5.46875C23.869 5.46875 24.2188 5.11897 24.2188 4.6875C24.2188 4.25603 23.869 3.90625 23.4375 3.90625V5.46875ZM1.5625 5.46875H23.4375V3.90625H1.5625V5.46875Z" fill="#71717A" />
                        <path d="M7.8125 4.6875C7.8125 5.11897 8.16228 5.46875 8.59375 5.46875C9.02522 5.46875 9.375 5.11897 9.375 4.6875H7.8125ZM15.625 4.6875C15.625 5.11897 15.9748 5.46875 16.4062 5.46875C16.8377 5.46875 17.1875 5.11897 17.1875 4.6875H15.625ZM14.8437 0.78125H10.1562V2.34375H14.8437V0.78125ZM10.1562 0.78125C9.53465 0.78125 8.93851 1.02818 8.49897 1.46772L9.60382 2.57257C9.75033 2.42606 9.94905 2.34375 10.1562 2.34375V0.78125ZM8.49897 1.46772C8.05943 1.90726 7.8125 2.5034 7.8125 3.125H9.375C9.375 2.9178 9.45731 2.71908 9.60382 2.57257L8.49897 1.46772ZM7.8125 3.125V4.6875H9.375V3.125H7.8125ZM17.1875 4.6875V3.125H15.625V4.6875H17.1875ZM17.1875 3.125C17.1875 2.5034 16.9405 1.90726 16.501 1.46772L15.3961 2.57257C15.5427 2.71908 15.625 2.9178 15.625 3.125H17.1875ZM16.501 1.46772C16.0615 1.02818 15.4653 0.78125 14.8437 0.78125V2.34375C15.0509 2.34375 15.2497 2.42606 15.3961 2.57257L16.501 1.46772Z" fill="#71717A" />
                        <path d="M9.375 17.9688C9.375 18.4002 9.72478 18.75 10.1562 18.75C10.5877 18.75 10.9375 18.4002 10.9375 17.9688H9.375ZM10.9375 10.1562C10.9375 9.72478 10.5877 9.375 10.1562 9.375C9.72478 9.375 9.375 9.72478 9.375 10.1562H10.9375ZM10.9375 17.9688V10.1562H9.375V17.9688H10.9375Z" fill="#71717A" />
                        <path d="M14.0625 17.9688C14.0625 18.4002 14.4123 18.75 14.8438 18.75C15.2752 18.75 15.625 18.4002 15.625 17.9688H14.0625ZM15.625 10.1562C15.625 9.72478 15.2752 9.375 14.8438 9.375C14.4123 9.375 14.0625 9.72478 14.0625 10.1562H15.625ZM15.625 17.9688V10.1562H14.0625V17.9688H15.625Z" fill="#71717A" />
                        <path d="M4.6848 4.62259C4.64895 4.1926 4.27132 3.8731 3.84134 3.90895C3.41135 3.9448 3.09185 4.32243 3.1277 4.75241L4.6848 4.62259ZM21.8723 4.75236C21.9081 4.32239 21.5886 3.94477 21.1586 3.90895C20.7286 3.87313 20.351 4.19266 20.3152 4.62264L21.8723 4.75236ZM18.8725 21.9393C18.8563 22.1346 18.7672 22.3171 18.6229 22.4498L19.6811 23.5995C20.1139 23.2013 20.381 22.6548 20.4296 22.0688L18.8725 21.9393ZM18.6229 22.4498C18.4788 22.5826 18.2899 22.6562 18.0939 22.6562L18.0936 24.2188C18.6818 24.2188 19.2484 23.9978 19.6811 23.5995L18.6229 22.4498ZM18.0939 22.6562H6.90729V24.2188H18.0936L18.0939 22.6562ZM6.90729 22.6562C6.71126 22.6562 6.52231 22.5826 6.37807 22.4498L5.31993 23.5995C5.75264 23.9978 6.31919 24.2188 6.90729 24.2188V22.6562ZM6.37807 22.4498C6.23384 22.3171 6.14478 22.1349 6.12857 21.9396L4.57143 22.0688C4.62004 22.6548 4.88721 23.2013 5.31993 23.5995L6.37807 22.4498ZM6.12857 21.9396L4.6848 4.62259L3.1277 4.75241L4.57143 22.0688L6.12857 21.9396ZM20.3152 4.62264L18.8725 21.9393L20.4296 22.0688L21.8723 4.75236L20.3152 4.62264Z" fill="#7D7D7D" />
                      </svg>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
