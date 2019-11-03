import React, { Component } from 'react';
import SearchCard from './SearchCard';
//import { withRouter} from 'react-router-dom';
import { Button } from 'reactstrap';
import PublicResultsCard from '../Components/songPlans/results/PublicResultsCard';
import APIManager from '../Modules/APIManager';

class SearchList extends Component {
    state = {
        allPublicPlans: [],
        publicPlanResults: []
    }

    componentDidMount() {
        APIManager.getAllPublic("songPlans").then((publicPlans) => {
            this.setState({
                allPublicPlans: publicPlans
            })
        })
    }
    search = () => {
        const searchInput = document.getElementById("search");
        let inputValue = searchInput.value.toUpperCase();
        let publicPlanMatches =[]
        this.state.allPublicPlans.map(publicPlan=>{
            if (publicPlan.title.toUpperCase().includes(inputValue)) {
                publicPlanMatches.push(publicPlan)
            }
        })
        this.setState({
            publicPlanResults: publicPlanMatches
        })
    }

    render() {
        return (
            <>
              <div className="md-form active-purple active-purple-2 mb-3">
                <input id="search"className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.handleFieldChange}/>
                <Button type="button" disabled={this.state.loadingStatus} onClick={this.search}>Search</Button>
              </div>
               <div>
                   <h2>Search Results</h2>
                   {
                       this.state.publicPlanResults.map(planResults=>
                        <PublicResultsCard key={planResults.id} planResults={planResults} {...this.props}/>
                        )
                   }



               </div>    
               <div>
                   <h2>All Public Songs</h2>
                   {
                       this.state.allPublicPlans.map(publicPlan=>
                        <SearchCard key={publicPlan.id} publicPlan={publicPlan} {...this.props}/>
                        )
                   }
               </div>    

            </>
        )
    }
}

export default SearchList;