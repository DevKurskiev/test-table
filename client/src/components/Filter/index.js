import React, { useState, useRef } from "react"
import ReactDOM from "react-dom"
import "./index.css"

const Filter = ({ isOpen, toggleModal, onFilter }) => {
	const inputRef = useRef()
	const [column, setColumn] = useState("select")
	const [condition, setCondition] = useState("select")

	const onChangeColumn = (event) => {
		setColumn(event.target.value)
    setCondition("equal")
	}

	const onChangeCondition = (event) => {
		setCondition(event.target.value)
	}

	const onApply = () => {
		if (column && condition && inputRef.current.value) {
			onFilter({ column, condition, value: inputRef.current.value })
		}
	}

	const onPortalClick = () => {
		toggleModal(false)
	}

	const onPrevent = (event) => {
		event.stopPropagation()
	}

  const onReset = () => {
    onFilter({ column: "", condition: "", value: "" })
    setColumn("")
    setCondition("")
    inputRef.current.value = ""
  }

	return ReactDOM.createPortal(
		<div className={`filter-modal ${isOpen ? "show" : ""}`} onClick={onPortalClick}>
			<div className="filter-modal__content" onClick={onPrevent}>
				<select value={column} onChange={onChangeColumn}>
					{
						[
							{ value: "select", disabled: true, text: "Выберите поле" },
							{ value: "date", text: "Дата" },
							{ value: "name", text: "Название" },
							{ value: "distance", text: "Расстояние" },
							{ value: "quantity", text: "Количество" }
						].map(item => (
							<option {...item} key={item.value}>{item.text}</option>
						))
					}
				</select>
				<select value={condition} onChange={onChangeCondition}>
					{
						[
							{ value: "select", disabled: true, text: "Выберите условие" },
							{ value: "equal", text: "Равно" },
							{ value: "match", text: "Содержит" },
							{ value: "gt", text: "Больше" },
							{ value: "lt", text: "Меньше" }
						].map(item => {
							if (
								column === "name" && ["gt", "lt"].includes(item.value) ||
								["date", "distance", "quantity"].includes(column) && item.value === "match"
							) {
								return null
							}

							return <option {...item} key={item.value}>{item.text}</option>
						})
					}
				</select>
				<input ref={inputRef} placeholder="Введите значение"/>
				<button onClick={onApply}>Применить</button>
				<button onClick={onReset}>Сбросить</button>
			</div>
		</div>,
		document.body
	)
}

export default Filter