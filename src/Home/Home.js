import React from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
    Row,
    Grid,
    ProgressBar,
    Button,
    Checkbox,
    Col,
    ControlLabel,
    FormControl,
    FormGroup,
    HelpBlock,
    Radio
} from "react-bootstrap";
import {getCasinoList, getCasinoListExt, getUsCasinoList} from '../DataScraper/CasinoScraper';

function FieldGroup({id, label, help, ...props}) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateName: null,
            password: null,
            dataProvider: null,
            showProgress:false,
            showResults:false,
            progress:10,
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePswd = this.onChangePswd.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.onSuccessLogin = this.onSuccessLogin.bind(this);
    }


    handleBtnClick() {

        this.setState({
            showProgress: true,
            progress:10,
        });

        getUsCasinoList(this.state.stateName, (result) => {
            setTimeout(()=>{
                this.setState({
                    showProgress: false,
                    dataProvider: result,
                    showResults:true,
                    progress:100,
                });
            },5000);


        });

    }

    onSuccessLogin() {
        this.props.rootActions.goToRouter("/home");
    }


    handleRegister() {
        // this.props.loginActions.skipLogin();
        // this.props.rootActions.goToRouter("home");
    }

    onChangeName(event) {
        this.setState({
            stateName: event.target.value
        });
    }

    onChangePswd(text) {
        this.setState({
            password: text
        });
    }

    render() {
        return (
            <Grid>
                <form>
                    <FieldGroup
                        id="casinoName"
                        type="text"
                        label="State/City Name:"
                        placeholder="California,Florida"
                        onChange={this.onChangeName}
                    />
                    <FieldGroup
                        id="rates"
                        type="text"
                        label="Rates:"
                        placeholder="Internal time such as 10s,20s,30s..."
                    />

                    <FieldGroup
                        id="maximumTime"
                        type="text"
                        label="Max Execution Time:"
                        placeholder="The maximum job execution time"
                    />
                    {/*<FieldGroup*/}
                    {/*id="formControlsPassword"*/}
                    {/*label="Password"*/}
                    {/*type="password"*/}
                    {/*onChange={this.onChangePswd}*/}
                    {/*placeholder="Password" />*/}
                    <FormGroup>
                        <Button bsStyle="primary" onClick={(event) => this.handleBtnClick(event)}>Start Job</Button>
                    </FormGroup>
                    {
                        this.state.showProgress ?
                            <FormGroup>
                                <p>Processing...</p>
                                <ProgressBar active now={this.state.progress}/>
                            </FormGroup>:null
                    }

                </form>

                {
                    this.state.showResults ?
                        <BootstrapTable data={this.state.dataProvider} striped hover>
                            <TableHeaderColumn isKey dataField='id'>No.</TableHeaderColumn>
                            <TableHeaderColumn dataField='Casino' dataSort={true} filter={{type: 'TextFilter', delay: 500}}>
                                Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='City'>City</TableHeaderColumn>
                            <TableHeaderColumn dataField='Comments'>Comments</TableHeaderColumn>
                            <TableHeaderColumn dataField='County'>County</TableHeaderColumn>
                            <TableHeaderColumn dataField='District'>District</TableHeaderColumn>
                            <TableHeaderColumn dataField='Type'>Type</TableHeaderColumn>
                            <TableHeaderColumn dataField='DateOpened'>Date Opened</TableHeaderColumn>
                        </BootstrapTable>
                        :null
                }



            </Grid>

        );
    }
}
