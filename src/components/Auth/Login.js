import React from 'react';
import {Grid, Form, Segment, Button, Header,Message ,Icon} from 'semantic-ui-react';

import {Link} from 'react-router-dom';

import firebase from '../../firebase'

class Login extends React.Component {

  state = {
    email:'',
    password:'',
    errors:[],
    loading:false

  }
handleChange = event => {

  this.setState({[event.target.name]: event.target.value})

}

displayError = errors => errors.map((error,i) => <p key={i}> {error.message} </p>)


handleSubmit = event => {
  event.preventDefault();
  if(this.isFormValid(this.state)) {

  this.setState({errors:[], loading: true})

  firebase
    .auth()
    .signInWithEmailAndPassword(this.state.email,this.state.password)
    .then(signedInUser => {
        console.log(signedInUser)
    })
    .catch(err => {
        console.log(err)
        this.setState({errors: this.state.errors.concat(err), loading: false})
    })
}

}

isFormValid = ({email,password}) => email && password;

handleInputError = (errors,inputName) => {
return errors.some(error => 
  error.message.toLowerCase().includes(inputName)
  ) ? 'error':''
}

  render() {
    const {email,password,errors,loading} = this.state;
      return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
          <Grid.Column style={{ maxWidth: 450 } }>
            <Header as="h3" icon color="violet" textAlign="center">
              <Icon name="code branch" color="violet" />
              Login to SpawN AI
            </Header>

            <Form onSubmit={this.handleSubmit} size="large">
              <Segment stacked>

                <Form.Input
                  fluid
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email address"
                  onChange={this.handleChange}
                  value={email}
                  className={this.handleInputError(errors,'email')}
                  type="email"
                />

                <Form.Input
                  fluid
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={password}
                  className={this.handleInputError(errors,'password')}
                  type="password"
                />

                <Button disabled={loading} className={loading ? 'loading':''} color='violet' fluid size="large">
                  Submit
                </Button>
              </Segment>
            </Form>
            {errors.length > 0 && (
            <Message error>
            <h3>Error</h3>
            { this.displayError(errors)}
            </Message>
            ) }
            <Message>
              Don't have an account? <Link to="/register">Register</Link>
            </Message>
            <Message.Content color = 'blue'>
           
             <h3> <font color='black'>Spawn your first AI bot</font></h3>

            </Message.Content>
          </Grid.Column>
        </Grid>
      );
  }
}
export default Login;