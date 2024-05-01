import "./CButton.css"

export const CButton = ({title, functionEmit }) => {
    return (
        <div className={"cButtonDesign"} onClick={functionEmit}>
            {title}
        </div>
    )
}