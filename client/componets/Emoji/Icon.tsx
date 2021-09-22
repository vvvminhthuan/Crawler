const Icon = ({value}) => {
    const handIcon = () => {
        let element: any = document.getElementsByClassName('js-input-chat')
        element[0].value = element[0].value + value
        element[0].focus()
    }
    return (
        <i className="icon" onClick={handIcon}>{value}</i>
    )
}
  
export default Icon