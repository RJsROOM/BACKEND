

const FormGroup = ({ label, placeholder}) => {
  return (
    <div className="form-group">
        <label htmlFor={label}>{label} :</label>
        <input type={label} id={label} name={label} placeholder={placeholder} required />
    </div>
  )
}

export default FormGroup