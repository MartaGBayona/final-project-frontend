import './CInput.css'

export const CInput = ({type, name, value, disabled, changeEmit }) => {

    return (
        <input
            className={'CInputDesign'}
            type={type}
            name={name}
            value={value}
            disabled={disabled}
            onChange={(e) => changeEmit(e)}
        />
    )
}