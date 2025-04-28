useEffect(() => {
    fetch('http://localhost:5000/api/student/123') // or by email
      .then(res => res.json())
      .then(data => setStudent(data));
  }, []);

  <img src={`http://localhost:5000/uploads/${student.photo}`} alt="Student Photo" />
