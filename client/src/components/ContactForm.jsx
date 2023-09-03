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
          <img src="https://hevc.in/sumil.jpeg" alt="" />
          <p>
            <span>Sumil Suthar</span>Senior Marketing Manager <br />
            Email: sumil@hevc.in
          </p>
        </div>
        <div>
          <img src="https://hevc.in/ajay.webp" alt="" />
          <p>
            <span>Ajay Maurya</span>Senior Marketing Manager <br />
            Email: ajay@hevc.in
          </p>
        </div>
        <div>
          <img src="https://hevc.in/sarthak.jpeg" alt="" />
          <p>
            <span>Sarthak Tanpure</span>Senior Marketing Manager <br />
            Email: sarthak@hevc.in
          </p>
        </div>
        <div>
          <img src="https://hevc.in/anas.jpeg" alt="" />
          <p>
            <span>Anas Khan</span>Senior Marketing Manager <br />
            Email: anas@hevc.in
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
