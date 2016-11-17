import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Wishlist from './Wishlist.jsx';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      gender: this.props.user.gender,
      min_price: this.props.user.min_price,
      max_price: this.props.user.max_price,
      myImages: [],
      wishList: []
    }
  }

  getMyImages(){
    var obj = {};
    obj['u_id'] = this.props.user.id;
    var context = this;
    axios.post('/api/myImages', obj)
    .then(function(result) {
      context.setState({ myImages: result.data})     
    });
      // this.state = {

      // }
  }

  handleInputChange(name, e) {
    e.preventDefault();
    var update = {};
    update[name] = e.target.value
    this.setState(update);
  }

  handleUpdate(e) {
    e.preventDefault();
    var obj = this.state;
    obj['id'] = this.props.user.id;
    axios.post('/update/profile', obj)
         .then(function(result) {
          console.log('sucessful update');
         });
  }

  getWishList(){
    console.log('yo')
    var obj = {};
    obj['userID'] = this.props.user.id;
    var context = this;
    axios.post('/api/getWishList', obj)
    .then(function(result) {
      context.setState({ wishList: result.data})     
      // console.log(result.data)     
    });
  }

  componentDidMount(){
    // this.getMyImages();
  }

  render() {
    console.log('props', this.props.user);
    return (
       <div>
           <h1>Profile</h1>
           <form>
             <img src={this.props.user.profile_pic} style={{maxHeight: "200px", maxWidth:"200px", height: "auto", width: "auto"}} />
             <p>Name:
               <input onChange={this.handleInputChange.bind(this, 'name')} type="text" defaultValue={this.props.user.name}/>
             </p>
             <p>Email:
               <input onChange={this.handleInputChange.bind(this, 'email')} type="text" defaultValue={this.props.user.email}/>
             </p>
             <p>Gender:
               <select onChange={this.handleInputChange.bind(this, 'gender')} defaultValue={this.props.user.gender}>
                <option value="men's">men</option>
                <option value="women's">women</option>
               </select>
             </p>
             <p>
             Min Price:
              <input onChange={this.handleInputChange.bind(this, 'min_price')} type="number" defaultValue={this.props.user.min_price}/>
             </p>
             <p>
             Max Price:
               <input onChange={this.handleInputChange.bind(this, 'max_price')} type="number" defaultValue={this.props.user.max_price}/>
             </p>
             <button type="submit" onClick={(e)=>this.handleUpdate(e)} value="Submit">Update</button>
             <button onClick={(e) => {e.preventDefault(); browserHistory.push('/');}}>Back</button>
           </form>
           <button onClick={()=> {this.getWishList() }} value='test'>TEST BUTTON</button>
           <div className='wishListArea'>
            <h2>My Wishlist</h2>
            <div className='wishList'>
              <Wishlist list={this.state.wishList}/>
            </div>
           </div>
       </div>
    );
  }
}
              // <Feed user={this.props.user} feed={this.state.wishList} setFeed={this.props.setFeed}
              //   sortPrice={this.props.sortPrice} sortBrand={this.props.sortBrand} sortCat={this.props.sortCat}
              //   toggleShow={this.props.toggleShow}
              // />
           // <div className='myWishList'>
           //  <h2>My Wishlist</h2>
           //  <div className='wishList'>
              // {
              //   this.state.myWishList.map((picObj) => <img src={picObj.name} />)
              // }
           //  </div>
           // </div>
// ****************************************************************************************
//look at the mapping of the wish list, now i need to build the actual wish list array,
// get it from the server/DB, maybe make a route/query to get all the urls 
// ****************************************************************************************

           // <div className='myPics'>
           //  <h2>My Uploaded Pictures</h2>
           //  <div className='picList'>
              // {
              //   this.state.myImages.map((picObj) => <img src={picObj.name} />)
              // }
           //  </div>
           // </div>

export default Profile;
