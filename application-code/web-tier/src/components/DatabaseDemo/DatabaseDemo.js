
    import React, {Component} from 'react';
    import './DatabaseDemo.css';

    class DatabaseDemo extends Component {
     
        constructor(props) {
            super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
            this.handleTextChange = this.handleTextChange.bind(this);
            this.handleButtonClick = this.handleButtonClick.bind(this);
            this.handleButtonClickDel = this.handleButtonClickDel.bind(this);
            this.state = { 
               transactions: [],
               text_amt: "",
               text_desc:""
            }
         }

         componentDidMount() {
            this.populateData();
          }

        populateData(){
            this.fetch_retry('/api/transaction',3)
            .then(res => res.json())
            .then((data) => {
              this.setState({ transactions : data.result });
              console.log("state set");
              console.log(this.state.transactions);
            })
            .catch(console.log);
        }  

        async fetch_retry(url, n){
            try {
                return await fetch(url)
            } catch(err) {
                if (n === 1) throw err;
                await new Promise(resolve => setTimeout(resolve, 1000)); 
                return await this.fetch_retry(url, n - 1);
            }
        };


          renderTableData() {
            return this.state.transactions.map((transaction, index) => {
               const { id, amount, description} = transaction //destructuring
               return (
                  <tr key={id}>
                     <td>{id}</td>
                     <td>{amount}</td>
                     <td>{description}</td>
                  </tr>
               )
            })
         }

        handleButtonClickDel(){
           const requestOptions = {
               method: 'DELETE'
           }
           fetch('/api/transaction', requestOptions)
           .then(response => response.json())
           .then(data => this.populateData())

           this.setState({text_amt : "", text_desc:"",transaction:[]});

        }

         handleButtonClick(){
             console.log(this.state.text_amt);
             console.log(this.state.text_desc);
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({"amount":this.state.text_amt, "desc" :this.state.text_desc})
            }
            
            fetch('/api/transaction', requestOptions)
            .then(response => response.json())
            .then(data => this.populateData())
            
            this.setState({text_amt : "", text_desc:""});

         }

         handleTextChange(e){
            this.setState({[e.target.name]:e.target.value})
         }


                render () {
                const totalCount = this.state.transactions.length;
                const totalAmount = this.state.transactions.reduce((sum, t) => {
                    const value = Number(t.amount);
                    return Number.isFinite(value) ? sum + value : sum;
                }, 0);

                return (
                        <div className="db-page">
                            <header className="db-hero">
                                <div className="db-hero__text">
                                    <p className="db-hero__eyebrow">AWS Aurora + API</p>
                                    <h1 className="db-hero__title">Aurora Transactions Console</h1>
                                    <p className="db-hero__subtitle">
                                        Add and review transactions stored in the database. Updates are reflected in the table below.
                                    </p>
                                    <div className="db-hero__actions">
                                        <button className="btn btn-secondary" type="button" onClick={this.handleButtonClickDel}>Clear All</button>
                                        <button className="btn btn-ghost" type="button" onClick={() => this.populateData()}>Refresh</button>
                                    </div>
                                </div>
                                <div className="db-hero__card">
                                    <div className="stat">
                                        <span className="stat__label">Transactions</span>
                                        <span className="stat__value">{totalCount}</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat__label">Total Amount</span>
                                        <span className="stat__value">{totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                            </header>

                            <section className="db-form">
                                <div className="db-form__field">
                                    <label htmlFor="amount-input">Amount</label>
                                    <input
                                        id="amount-input"
                                        type="text"
                                        name="text_amt"
                                        value={this.state.text_amt}
                                        onChange={this.handleTextChange}
                                        placeholder="e.g. 125.50"
                                    />
                                </div>
                                <div className="db-form__field">
                                    <label htmlFor="desc-input">Description</label>
                                    <input
                                        id="desc-input"
                                        type="text"
                                        name="text_desc"
                                        value={this.state.text_desc}
                                        onChange={this.handleTextChange}
                                        placeholder="e.g. Payment received"
                                    />
                                </div>
                                <button className="btn btn-primary" type="button" onClick={this.handleButtonClick}>Add Transaction</button>
                            </section>

                            <section className="db-table">
                                <div className="db-table__header">
                                    <h2>Recent Activity</h2>
                                    <span className="db-table__count">{totalCount} records</span>
                                </div>
                                <div className="db-table__wrap">
                                    <table className="transactions-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>AMOUNT</th>
                                                <th>DESCRIPTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderTableData()}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>

                );
            }
    }

    export default DatabaseDemo;