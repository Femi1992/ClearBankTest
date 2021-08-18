import React, { Component } from 'react';

export class FetchData extends React.Component {
    displayName = FetchData.name

  constructor() {
      super();
      this.state = {
          data: "",
          index: 0,
          loading: true
      };

      this.NextCat = this.NextCat.bind(this);
      this.PrevCat = this.PrevCat.bind(this);
      this.renderCatInfo = this.renderCatInfo.bind(this);

      fetch('api/CallCatAPI/GetCatBreeds')
          .then(response => response.json())
          .then(data => {
              this.setState({
                  data: data,
                  dataLength: data.length,
                  loading : false
              });
          });
    }

    NextCat() {
        let currIndex = this.state.index;
        let length = this.state.dataLength;

        if (currIndex == length-1) {
            this.setState({ index: 0 })
        } else {
            this.setState({ index: currIndex += 1 })
        }
    }

    PrevCat() {
        let currIndex = this.state.index;

        if (currIndex == 0) {
            this.setState({ index: 0 })
        } else {
            this.setState({ index: currIndex -= 1 })
        }
    }

    renderCatInfo() {
        let data = this.state.data;
        let index = this.state.index
        return (
            <div class="col">
                <div class="card shadow-sm">
                    <img src={data[index] != undefined ? data[index].image.url : ""} class="d-block w-100" alt="..."></img>
                    <div class="card-body">
                        <p class="card-text">Name: {data[index].name}</p>
                        <p class="card-text">Description: {data[index].description}</p>
                        <p class="card-text">Temperament: {data[index].temperament}</p>
                        <a href={data[index].cfa_url != undefined ? data[index].cfa_url : data[index].wikipedia_url} target="_blank">Learn More</a>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary" onClick={this.PrevCat}>Previous</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary" onClick={this.NextCat}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
  }

  render() {
    let contents = this.state.loading ? <p><em>Loading...</em></p>: this.renderCatInfo();
    return (
      <div>
        <h1>Cat Info</h1>
            {contents}
      </div>
    );
  }
}
