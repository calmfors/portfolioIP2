import React from 'react';

const Webmail = (props) => {
    return (
        <form method='post'
            onSubmit={this.submitHandler.bind(this)}>

            <label htmlFor='realname'>Name</label>
            <input type='text' name='realname' id='realname' value={this.state.realname} onChange={this.handleChange.bind(this)} required /><br />

            {/* <label htmlFor='city'>City</label>
              <input type='text' name='city' id='city' /><br /> */}

            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' value={this.state.email} onChange={this.handleChange.bind(this)} required /><br />

            <label htmlFor='Message'>Message</label>
            <textarea name='Message' rows='3' cols='60' id='Message' value={this.state.Message} onChange={this.handleChange.bind(this)} required></textarea>

            <input type='submit' name='submit' value={this.state.submit} className='button' />
        </form>
    )
};

export default Webmail;