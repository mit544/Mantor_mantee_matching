export default function StepOne({ formData, setFormData }) {
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    return (
      <div className="space-y-6">
        <input
          name="student_id"
          placeholder="Student ID"
          onChange={handleChange}
          value={formData.student_id}
          className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
          className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select
          name="course"
          onChange={handleChange}
          value={formData.course}
          className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select Course</option>
          {[
            "Accounting and Finance",
            "Business Management",
            "Business of Football",
            "Sports Management",
            "Computer Science",
            "Cyber Security",
            "Digital Marketing",
            "Software Development",
            "Digital Content Production",
            "Sports Journalism",
            "Sports Media and Communications",
            "Exercise Studies",
            "Health, Exercise and Sport",
            "Physical Education",
            "Sports and Exercise Science",
            "Sports Coaching",
          ].map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
        <select
          name="course_domain"
          onChange={handleChange}
          value={formData.course_domain}
          className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select Course Domain</option>
          {["Business", "Digital", "Media", "Sport"].map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>
      </div>
    );
  }
  