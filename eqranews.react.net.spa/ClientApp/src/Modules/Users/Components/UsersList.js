import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FormUtils from '../../_shared/lib/FormUtils';
import * as AppUtilities from '../../_shared/lib/AppUtilities';
import { DTable } from '../../_shared/components/DTable';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
	requestFetchAllUsers,
	requestFetchUsersByRole,
} from '../Actions/UsersList';
class UsersList extends Component {
	constructor(props) {
		super(props);
		const initialFieldValues = this.initialFieldValues();
		this.state = { ...initialFieldValues, Errors: {} };
		this.columns = [
			{ title: 'Id', name: 'id' },
			{ title: 'UserName', name: 'userName' },
			{ title: 'Email', name: 'email' },
			{ title: 'FirstName', name: 'firstName' },
			{ title: 'LastName', name: 'lastName' },
			{ title: 'lockoutEnabled', name: 'lockoutEnabled' },
			{ title: 'Verified', name: 'emailConfirmed' },

			{ title: 'EDIT', defaultContent: '' },
			{ title: 'DELETE', defaultContent: '' },
		];
		this.columnDefs = [
			{ targets: 0, visible: false },
			{ targets: [7, 8], orderable: false },
			{
				targets: 7,
				createdCell: (td, cellData, rowData, row, col) => {
					const lnkSTr = '/Users/' + rowData[0];
					return ReactDOM.render(
						<a
							style={{ cursor: 'pointer', color: 'green' }}
							onClick={() => {
								this.props.history.push({
									pathname: lnkSTr,
								});
							}}
						>
							<i className="material-icons">edit</i>
						</a>,
						td
					);
				},
			},
			{
				targets: 8,
				createdCell: FormUtils.createDeleteButton(
					this.props.DeleteCrawlStepper
				),
			},
		];
	}
	componentWillMount = () => {
		this.props.requestFetchAllUsers();
	};

	initialFieldValues = (id = 0) => {
		let result = {
			id: id,
			name: '',
			username: '',
			verified: '',
			active: '',
			status: '',
			role: '',
			lastActivity: '',
		};

		return result;
	};

	getData = () => {
		return [
			{
				id: 1,
				username: 'ahmedgalal008',
				name: 'Ahmed Galal',
				lastActivity: '2020/10/12',
				verified: 'verified',
				role: 'Admin',
				status: 'Active',
			},
		];
	};

	render() {
		return this.serverRender();
	}

	serverRender = () => {
		return (
			<div className="users-list">
				<div className="row">
					<div className="col s12">
						<div className="container">
							{
								//<!-- users list start -->
							}
							<section className="users-list-wrapper section">
								<div className="users-list-filter">
									<div className="card-panel">
										<div className="row">
											<form>
												<div className="col s12 m6 l3">
													<label htmlFor="users-list-verified">Verified</label>
													<div className="input-field">
														<select
															className="form-control"
															id="users-list-verified"
														>
															<option value="">Any</option>
															<option value="Yes">Yes</option>
															<option value="No">No</option>
														</select>
													</div>
												</div>
												<div className="col s12 m6 l3">
													<label htmlFor="users-list-role">Role</label>
													<div className="input-field">
														<select
															className="form-control"
															id="users-list-role"
														>
															<option value="">Any</option>
															<option value="User">User</option>
															<option value="Staff">Staff</option>
														</select>
													</div>
												</div>
												<div className="col s12 m6 l3">
													<label htmlFor="users-list-status">Status</label>
													<div className="input-field">
														<select
															className="form-control"
															id="users-list-status"
														>
															<option value="">Any</option>
															<option value="Active">Active</option>
															<option value="Close">Close</option>
															<option value="Banned">Banned</option>
														</select>
													</div>
												</div>
												<div className="col s12 m6 l3 display-flex align-items-center show-btn">
													<button
														type="submit"
														className="btn btn-block indigo waves-effect waves-light"
													>
														Show
													</button>
												</div>
											</form>
										</div>
									</div>
								</div>
								<div className="users-list-table">
									<div className="card">
										<div className="card-content">
											{
												// <!-- datatable start -->
											}
											<div className="responsive-table">
												<DTable
													data={FormUtils.tableData(
														this.columns,
														this.props.Users //this.getData()
													)}
													columns={this.columns}
													formate={this.formate}
													columnDefs={this.columnDefs}
												></DTable>
											</div>
											{
												//<!-- datatable ends -->
											}
										</div>
									</div>
								</div>
							</section>
							{
								//<!-- users list ends -->
							}
							<div
								style={{ bottom: '50px', right: '19px' }}
								className="fixed-action-btn direction-top"
							>
								<a className="btn-floating btn-large gradient-45deg-light-blue-cyan gradient-shadow">
									<i className="material-icons">add</i>
								</a>
								<ul>
									<li>
										<a href="css-helpers.html" className="btn-floating blue">
											<i className="material-icons">help_outline</i>
										</a>
									</li>
									<li>
										<a
											href="cards-extended.html"
											className="btn-floating green"
										>
											<i className="material-icons">widgets</i>
										</a>
									</li>
									<li>
										<a href="app-calendar.html" className="btn-floating amber">
											<i className="material-icons">today</i>
										</a>
									</li>
									<li>
										<a href="app-email.html" className="btn-floating red">
											<i className="material-icons">mail_outline</i>
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="content-overlay"></div>
					</div>
				</div>
			</div>
		);
	};

	sourceRender() {
		return (
			<div className="users-list">
				<div className="row">
					<div className="col s12">
						<div className="container">
							{
								//<!-- users list start -->
							}
							<section className="users-list-wrapper section">
								<div className="users-list-filter">
									<div className="card-panel">
										<div className="row">
											<form>
												<div className="col s12 m6 l3">
													<label htmlFor="users-list-verified">Verified</label>
													<div className="input-field">
														<select
															className="form-control"
															id="users-list-verified"
														>
															<option value="">Any</option>
															<option value="Yes">Yes</option>
															<option value="No">No</option>
														</select>
													</div>
												</div>
												<div className="col s12 m6 l3">
													<label htmlFor="users-list-role">Role</label>
													<div className="input-field">
														<select
															className="form-control"
															id="users-list-role"
														>
															<option value="">Any</option>
															<option value="User">User</option>
															<option value="Staff">Staff</option>
														</select>
													</div>
												</div>
												<div className="col s12 m6 l3">
													<label htmlFor="users-list-status">Status</label>
													<div className="input-field">
														<select
															className="form-control"
															id="users-list-status"
														>
															<option value="">Any</option>
															<option value="Active">Active</option>
															<option value="Close">Close</option>
															<option value="Banned">Banned</option>
														</select>
													</div>
												</div>
												<div className="col s12 m6 l3 display-flex align-items-center show-btn">
													<button
														type="submit"
														className="btn btn-block indigo waves-effect waves-light"
													>
														Show
													</button>
												</div>
											</form>
										</div>
									</div>
								</div>
								<div className="users-list-table">
									<div className="card">
										<div className="card-content">
											{
												// <!-- datatable start -->
											}
											<div className="responsive-table">
												<table id="users-list-datatable" className="table">
													<thead>
														<tr>
															<th></th>
															<th>id</th>
															<th>username</th>
															<th>name</th>
															<th>last activity</th>
															<th>verified</th>
															<th>role</th>
															<th>status</th>
															<th>edit</th>
															<th>view</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td></td>
															<td>300</td>
															<td>
																<a href="page-users-view.html">dean3004</a>
															</td>
															<td>Dean Stanley</td>
															<td>30/04/2019</td>
															<td>No</td>
															<td>Staff</td>
															<td>
																<span className="chip green lighten-5">
																	<span className="green-text">Active</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>301</td>
															<td>
																<a href="page-users-view.html">zena0604</a>
															</td>
															<td>Zena Buckley</td>
															<td>06/04/2020</td>
															<td>Yes</td>
															<td>User </td>
															<td>
																<span className="chip green lighten-5">
																	<span className="green-text">Active</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>302</td>
															<td>
																<a href="page-users-view.html">delilah0301</a>
															</td>
															<td>Delilah Moon</td>
															<td>03/01/2020</td>
															<td>Yes</td>
															<td>User </td>
															<td>
																<span className="chip green lighten-5">
																	<span className="green-text">Active</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>303</td>
															<td>
																<a href="page-users-view.html">hillary1807</a>
															</td>
															<td>Hillary Rasmussen</td>
															<td>18/07/2019</td>
															<td>No</td>
															<td>Staff</td>
															<td>
																<span className="chip red lighten-5">
																	<span className="red-text">Banned</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>304</td>
															<td>
																<a href="page-users-view.html">herman2003</a>
															</td>
															<td>Herman Tate</td>
															<td>20/03/2020</td>
															<td>No</td>
															<td>Staff</td>
															<td>
																<span className="chip red lighten-5">
																	<span className="red-text">Banned</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>305</td>
															<td>
																<a href="page-users-view.html">kuame3008</a>
															</td>
															<td>Kuame Ford</td>
															<td>30/08/2019</td>
															<td>Yes</td>
															<td>User </td>
															<td>
																<span className="chip green lighten-5">
																	<span className="green-text">Active</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>306</td>
															<td>
																<a href="page-users-view.html">fulton2009</a>
															</td>
															<td>Fulton Stafford</td>
															<td>20/09/2019</td>
															<td>Yes</td>
															<td>User </td>
															<td>
																<span className="chip green lighten-5">
																	<span className="green-text">Active</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>307</td>
															<td>
																<a href="page-users-view.html">piper0508</a>
															</td>
															<td>Piper Jordan</td>
															<td>05/08/2020</td>
															<td>Yes</td>
															<td>User </td>
															<td>
																<span className="chip green lighten-5">
																	<span className="green-text">Active</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>308</td>
															<td>
																<a href="page-users-view.html">neil1002</a>
															</td>
															<td>Neil Sosa</td>
															<td>10/02/2019</td>
															<td>No</td>
															<td>Staff</td>
															<td>
																<span className="chip red lighten-5">
																	<span className="red-text">Banned</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>309</td>
															<td>
																<a href="page-users-view.html">caldwell2402</a>
															</td>
															<td>Caldwell Chapman</td>
															<td>24/02/2020</td>
															<td>Yes</td>
															<td>User </td>
															<td>
																<span className="chip green lighten-5">
																	<span className="green-text">Active</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>310</td>
															<td>
																<a href="page-users-view.html">wesley0508</a>
															</td>
															<td>Wesley Oneil</td>
															<td>05/08/2020</td>
															<td>No</td>
															<td>Staff</td>
															<td>
																<span className="chip red lighten-5">
																	<span className="red-text">Banned</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>311</td>
															<td>
																<a href="page-users-view.html">tallulah2009</a>
															</td>
															<td>Tallulah Fleming</td>
															<td>20/09/2019</td>
															<td>No</td>
															<td>Staff</td>
															<td>
																<span className="chip red lighten-5">
																	<span className="red-text">Banned</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>312</td>
															<td>
																<a href="page-users-view.html">iris2505</a>
															</td>
															<td>Iris Maddox</td>
															<td>25/05/2019</td>
															<td>No</td>
															<td>Staff</td>
															<td>
																<span className="chip red lighten-5">
																	<span className="red-text">Banned</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>313</td>
															<td>
																<a href="page-users-view.html">caleb1504</a>
															</td>
															<td>Caleb Bradley</td>
															<td>15/04/2020</td>
															<td>Yes</td>
															<td>User </td>
															<td>
																<span className="chip green lighten-5">
																	<span className="green-text">Active</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>314</td>
															<td>
																<a href="page-users-view.html">illiana0410</a>
															</td>
															<td>Illiana Grimes</td>
															<td>04/10/2019</td>
															<td>No</td>
															<td>Staff</td>
															<td>
																<span className="chip red lighten-5">
																	<span className="red-text">Banned</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>315</td>
															<td>
																<a href="page-users-view.html">chester0902</a>
															</td>
															<td>Chester Estes</td>
															<td>09/02/2020</td>
															<td>Yes</td>
															<td>User </td>
															<td>
																<span className="chip green lighten-5">
																	<span className="green-text">Active</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>316</td>
															<td>
																<a href="page-users-view.html">gregory2309</a>
															</td>
															<td>Gregory Hayden</td>
															<td>23/09/2019</td>
															<td>Yes</td>
															<td>User </td>
															<td>
																<span className="chip green lighten-5">
																	<span className="green-text">Active</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>317</td>
															<td>
																<a href="page-users-view.html">jescie1802</a>
															</td>
															<td>Jescie Parker</td>
															<td>18/02/2019</td>
															<td>No</td>
															<td>Staff</td>
															<td>
																<span className="chip red lighten-5">
																	<span className="red-text">Banned</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>318</td>
															<td>
																<a href="page-users-view.html">sydney3101</a>
															</td>
															<td>Sydney Cabrera</td>
															<td>31/01/2020</td>
															<td>No</td>
															<td>Staff</td>
															<td>
																<span className="chip red lighten-5">
																	<span className="red-text">Banned</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>319</td>
															<td>
																<a href="page-users-view.html">gray2702</a>
															</td>
															<td>Gray Valenzuela</td>
															<td>27/02/2020</td>
															<td>No</td>
															<td>Staff</td>
															<td>
																<span className="chip orange lighten-5">
																	<span className="orange-text">Close</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>320</td>
															<td>
																<a href="page-users-view.html">hoyt0305</a>
															</td>
															<td>Hoyt Ellison</td>
															<td>03/05/2020</td>
															<td>Yes</td>
															<td>User </td>
															<td>
																<span className="chip green lighten-5">
																	<span className="green-text">Active</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>321</td>
															<td>
																<a href="page-users-view.html">damon0209</a>
															</td>
															<td>Damon Berry</td>
															<td>02/09/2019</td>
															<td>No</td>
															<td>Staff</td>
															<td>
																<span className="chip red lighten-5">
																	<span className="red-text">Banned</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>322</td>
															<td>
																<a href="page-users-view.html">kelsie0511</a>
															</td>
															<td>Kelsie Dunlap</td>
															<td>05/11/2019</td>
															<td>Yes</td>
															<td>User </td>
															<td>
																<span className="chip orange lighten-5">
																	<span className="orange-text">Close</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>323</td>
															<td>
																<a href="page-users-view.html">abel1606</a>
															</td>
															<td>Abel Dunn</td>
															<td>16/06/2020</td>
															<td>No</td>
															<td>Staff</td>
															<td>
																<span className="chip red lighten-5">
																	<span className="red-text">Banned</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>324</td>
															<td>
																<a href="page-users-view.html">nina2208</a>
															</td>
															<td>Nina Byers</td>
															<td>22/08/2019</td>
															<td>Yes</td>
															<td>User </td>
															<td>
																<span className="chip orange lighten-5">
																	<span className="orange-text">Close</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>325</td>
															<td>
																<a href="page-users-view.html">erasmus1809</a>
															</td>
															<td>Erasmus Walter</td>
															<td>18/09/2019</td>
															<td>Yes</td>
															<td>User </td>
															<td>
																<span className="chip green lighten-5">
																	<span className="green-text">Active</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>326</td>
															<td>
																<a href="page-users-view.html">yael2612</a>
															</td>
															<td>Yael Marshall</td>
															<td>26/12/2019</td>
															<td>Yes</td>
															<td>User </td>
															<td>
																<span className="chip orange lighten-5">
																	<span className="orange-text">Close</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>327</td>
															<td>
																<a href="page-users-view.html">thomas2012</a>
															</td>
															<td>Thomas Dudley</td>
															<td>20/12/2019</td>
															<td>Yes</td>
															<td>User </td>
															<td>
																<span className="chip green lighten-5">
																	<span className="green-text">Active</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>328</td>
															<td>
																<a href="page-users-view.html">althea2810</a>
															</td>
															<td>Althea Turner</td>
															<td>28/10/2019</td>
															<td>Yes</td>
															<td>User </td>
															<td>
																<span className="chip green lighten-5">
																	<span className="green-text">Active</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>329</td>
															<td>
																<a href="page-users-view.html">jena2206</a>
															</td>
															<td>Jena Schroeder</td>
															<td>22/06/2019</td>
															<td>No</td>
															<td>Staff</td>
															<td>
																<span className="chip red lighten-5">
																	<span className="red-text">Banned</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>330</td>
															<td>
																<a href="page-users-view.html">hyacinth2201</a>
															</td>
															<td>Hyacinth Maxwell</td>
															<td>22/01/2019</td>
															<td>No</td>
															<td>Staff</td>
															<td>
																<span className="chip red lighten-5">
																	<span className="red-text">Banned</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>331</td>
															<td>
																<a href="page-users-view.html">madeson1907</a>
															</td>
															<td>Madeson Byers</td>
															<td>19/07/2020</td>
															<td>Yes</td>
															<td>User </td>
															<td>
																<span className="chip green lighten-5">
																	<span className="green-text">Active</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>332</td>
															<td>
																<a href="page-users-view.html">elmo0707</a>
															</td>
															<td>Elmo Tran</td>
															<td>07/07/2020</td>
															<td>Yes</td>
															<td>User </td>
															<td>
																<span className="chip green lighten-5">
																	<span className="green-text">Active</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>333</td>
															<td>
																<a href="page-users-view.html">shelley0309</a>
															</td>
															<td>Shelley Eaton</td>
															<td>03/09/2019</td>
															<td>Yes</td>
															<td>User </td>
															<td>
																<span className="chip green lighten-5">
																	<span className="green-text">Active</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>334</td>
															<td>
																<a href="page-users-view.html">graham0301</a>
															</td>
															<td>Graham Flores</td>
															<td>03/01/2019</td>
															<td>No</td>
															<td>Staff</td>
															<td>
																<span className="chip red lighten-5">
																	<span className="red-text">Banned</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>335</td>
															<td>
																<a href="page-users-view.html">erasmus2110</a>
															</td>
															<td>Erasmus Mclaughlin</td>
															<td>21/10/2019</td>
															<td>Yes</td>
															<td>User </td>
															<td>
																<span className="chip green lighten-5">
																	<span className="green-text">Active</span>
																</span>
															</td>
															<td>
																<a href="page-users-edit.html">
																	<i className="material-icons">edit</i>
																</a>
															</td>
															<td>
																<a href="page-users-view.html">
																	<i className="material-icons">
																		remove_red_eye
																	</i>
																</a>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
											{
												//<!-- datatable ends -->
											}
										</div>
									</div>
								</div>
							</section>
							{
								//<!-- users list ends -->
							}
							<div
								style={{ bottom: '50px', right: '19px' }}
								className="fixed-action-btn direction-top"
							>
								<a className="btn-floating btn-large gradient-45deg-light-blue-cyan gradient-shadow">
									<i className="material-icons">add</i>
								</a>
								<ul>
									<li>
										<a href="css-helpers.html" className="btn-floating blue">
											<i className="material-icons">help_outline</i>
										</a>
									</li>
									<li>
										<a
											href="cards-extended.html"
											className="btn-floating green"
										>
											<i className="material-icons">widgets</i>
										</a>
									</li>
									<li>
										<a href="app-calendar.html" className="btn-floating amber">
											<i className="material-icons">today</i>
										</a>
									</li>
									<li>
										<a href="app-email.html" className="btn-floating red">
											<i className="material-icons">mail_outline</i>
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="content-overlay"></div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log('users', state.Users);
	return {
		countries: state.Countries,
		Users: state.Users,
	};
};

const mapActionToProps = {
	requestFetchAllUsers: requestFetchAllUsers,
	requestFetchUsersByRole: requestFetchUsersByRole,
	updateNavigationState: data => ({
		type: 'UPDATE_NAVIGATION_STATE',
		data: data,
	}),
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withRouter(UsersList));
