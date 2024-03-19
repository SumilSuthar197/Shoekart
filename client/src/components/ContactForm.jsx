const ContactForm = () => {
  return (
    <div className="form-details">
      <form action="">
        <span>LEAVE A MESSAGE</span>
        <h2>We love to hear from you</h2>
        <input type="text" name="" id="" placeholder="Your Name" />
        <input type="email" name="" id="" placeholder="E-mail" />
        <input type="text" name="" id="" placeholder="Subject" />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Your Message"
        ></textarea>
        <button>Submit</button>
      </form>
      <div className="people">
        <div>
          <img
            src="https://secdatacom.no/wp-content/uploads/sites/3/2019/10/blank-profile-male.jpg"
            alt="profile-photo"
          />
          <p>
            <span>Sumil Suthar</span>Software Engineer <br />
            sumil.suthar@gmail.com
          </p>
        </div>
        <div>
          <img
            src="https://secdatacom.no/wp-content/uploads/sites/3/2019/10/blank-profile-male.jpg"
            alt="profile-photo"
          />
          <p>
            <span>Sumil Suthar</span>Software Engineer <br />
            sumil.suthar@gmail.com
          </p>
        </div>
        <div>
          <img
            src="https://secdatacom.no/wp-content/uploads/sites/3/2019/10/blank-profile-male.jpg"
            alt="profile-photo"
          />
          <p>
            <span>Sumil Suthar</span>Software Engineer <br />
            sumil.suthar@gmail.com
          </p>
        </div>
        <div>
          <img
            src="https://secdatacom.no/wp-content/uploads/sites/3/2019/10/blank-profile-male.jpg"
            alt="profile-photo"
          />
          <p>
            <span>Sumil Suthar</span>Software Engineer <br />
            sumil.suthar@gmail.com
          </p>
        </div>
        {/* <div>
                    <img src={b5} alt="" />
                    <p><span>Sumil Suthar</span>Senior Marketing Manager <br />Email: sumil@hevc.in</p>
                </div> */}
      </div>
    </div>
  );
};

export default ContactForm;
