//...
const [credentials, setCredentials] = useState({ email: "", password: "" });
const handleSubmit = (event) => {
    const { value, name } = event.target;
    setCredentials({ ...credentials, [name]: value });
};

// ...
