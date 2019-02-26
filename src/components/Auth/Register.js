import React from 'react';
import {Grid, Form, Segment, Button, Header,Message ,Icon} from 'semantic-ui-react';

import {Link} from 'react-router-dom';

import firebase from '../../firebase'
import md5 from 'md5';

class Register extends React.Component {

  state = {
    username:'',
    email:'',
    password:'',
    passwordConfirmation:'',
    errors:[],
    loading:false,
    userRef: firebase.database().ref('users')

  }
handleChange = event => {

  this.setState({[event.target.name]: event.target.value})

}

isFormValid = () => {
  let errors =[]
  let error;
  if(this.isFormEmpty(this.state)){
    
    error = {message: 'Please in fill all fields.'};
    this.setState({errors: errors.concat(error)});
    return false;
    
  }else if(!this.isPasswordValid(this.state)){

    if(this.state.password.length< 6 || this.state.passwordConfirmation <6){
      error = {message:'Password should be minimum of 6 characters.'};
      this.setState({errors: errors.concat(error)});
      return false;
    } else if(this.state.password !== this.state.passwordConfirmation){
      error = {message:'Password does not match.'};
      this.setState({errors: errors.concat(error)});
      return false;
    }else {
    
    error = { message: 'Password is invalid.'};
    this.setState({errors: errors.concat(error)});
    return false;
  }

}else {
  
  return true;
}

}

displayError = errors => errors.map((error,i) => <p key={i}> {error.message} </p>)

isPasswordValid = ({password,passwordConfirmation}) => {
  if(password.length <6 || passwordConfirmation.length <6){
    return false;
  }else if(password !== passwordConfirmation){
    return false;
  }else {
    return true;
  }
}

isFormEmpty = ({username,email,password,passwordConfirmation}) => {
  
  return !username.length 
         || !email.length 
         || !password.length 
         || !passwordConfirmation.length;

}

handleSubmit = event => {
  event.preventDefault();
  if(this.isFormValid()) {

  this.setState({errors:[], loading: true})

  firebase
  .auth()
  .createUserWithEmailAndPassword(this.state.email,this.state.password)
  .then(createdUser =>{
        console.log(createdUser)  
        //this.setState({loading:false})
        createdUser.user.updateProfile({
          displayName: this.state.username,
          photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
        }) 
        .then(() => {
         // this.setState({loading:false})
         this.saveUser(createdUser).then(() => {
           console.log('User saved')
         })
        })
        .catch(err => {
          console.log(err)
          this.setState({errors: this.state.errors.concat(err), loading:false})
        })        
  }
  
  )
  .catch(err => {
    console.log(err)
    this.setState({errors: this.state.errors.concat(err), loading:false})
  })
}

}

handleInputError = (errors,inputName) => {
return errors.some(error => 
  error.message.toLowerCase().includes(inputName)
  ) ? 'error':''
}

saveUser = createdUser => {
  return this.state.userRef.child(createdUser.user.uid).set({
    name: createdUser.user.displayName,
    avatar: createdUser.user.photoURL
  });
}

  render() {
    const {username,email,password,passwordConfirmation,errors,loading} = this.state;
      return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
          <Grid.Column style={{ maxWidth: 450 } }>
            <Header as="h3" icon color="blue" textAlign="center">
              <Icon name="universal access" color="blue" />
              Register for SpawN AI
            </Header>

            <Form onSubmit={this.handleSubmit} size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  name="username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  onChange={this.handleChange}
                  value={username}
                  type="text"
                />

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

                <Form.Input
                  fluid
                  name="passwordConfirmation"
                  icon="repeat"
                  iconPosition="left"
                  placeholder="Password Confirmation"
                  onChange={this.handleChange}
                  value={passwordConfirmation}
                  className={this.handleInputError(errors,'password')}
                  type="password"
                />

                <Button disabled={loading} className={loading ? 'loading':''} primary fluid size="large">
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
              Already a user? <Link to="/login">Login</Link>
            </Message>
            <Message.Content color = 'blue'>
           
             <h3> <font color='black'>Spawn your first AI bot</font></h3>

            </Message.Content>
          </Grid.Column>
        </Grid>
      );
  }

 

}
export default Register;