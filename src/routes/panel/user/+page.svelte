<script lang="ts">
	import { formSchema, type FormSchema } from '$lib/schemas/user/user';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: { form: SuperValidated<Infer<FormSchema>> };

	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<div class="nk-content">
	<div class="container-fluid">
		<div class="nk-content-inner">
			<div class="nk-content-body">
				<div class="nk-block-head nk-block-head-sm">
					<div class="nk-block-between">
						<div class="nk-block-head-content">
							<h3 class="nk-block-title page-title">Users</h3>
							<div class="nk-block-des text-soft">
								<p>You have total {data.countAllUser} users.</p>
							</div>
						</div>
						<!-- .nk-block-head-content -->
						<div class="nk-block-head-content">
							<div class="toggle-wrap nk-block-tools-toggle">
								<a
									href="#"
									class="btn btn-icon btn-trigger toggle-expand me-n1"
									data-target="pageMenu"><em class="icon ni ni-menu-alt-r"></em></a
								>
								<div class="toggle-expand-content" data-content="pageMenu">
									<ul class="nk-block-tools g-3">
										<li>
											<a href="#" class="btn btn-white btn-outline-light disabled"
												><em class="icon ni ni-download-cloud"></em><span>Export</span></a
											>
										</li>
										<li class="nk-block-tools-opt">
											<a href="#addUserData" data-bs-toggle="modal" class="btn btn-primary">
												<em class="icon ni ni-plus-round"></em><span>Add User</span>
											</a>
										</li>
									</ul>
								</div>
							</div>
							<!-- .toggle-wrap -->
						</div>
						<!-- .nk-block-head-content -->
					</div>
					<!-- .nk-block-between -->
				</div>
				<!-- .nk-block-head -->
				<div class="nk-block">
					<div class="row g-gs">
						{#each data.allUser as items, index (index)}
							<div class="col-sm-6 col-lg-4 col-xxl-3">
								<div class="card card-bordered">
									<div class="card-inner">
										<div class="team">
											<div
												class={`team-status ${items.emailVerified ? 'bg-success' : 'bg-danger'} text-white`}
											>
												<em class={`icon ni ${items.emailVerified ? 'ni-check' : 'ni-na'}`}></em>
											</div>
											<div class="team-options">
												<div class="drodown">
													<a
														href="#"
														class="dropdown-toggle btn btn-sm btn-icon btn-trigger"
														data-bs-toggle="dropdown"><em class="icon ni ni-more-h"></em></a
													>
													<div class="dropdown-menu dropdown-menu-end">
														<ul class="link-list-opt no-bdr">
															<li>
																<a href="#"
																	><em class="icon ni ni-focus"></em><span>Quick View</span></a
																>
															</li>
															<li>
																<a href="#"
																	><em class="icon ni ni-eye"></em><span>View Details</span></a
																>
															</li>
															<li>
																<a href="#"
																	><em class="icon ni ni-mail"></em><span>Send Email</span></a
																>
															</li>
															<li class="divider"></li>
															<li>
																<a href="#"
																	><em class="icon ni ni-shield-star"></em><span>Reset Pass</span
																	></a
																>
															</li>
															<li>
																<a href="#"
																	><em class="icon ni ni-shield-off"></em><span>Reset 2FA</span></a
																>
															</li>
															<li>
																<a href="#"
																	><em class="icon ni ni-na"></em><span>Suspend User</span></a
																>
															</li>
														</ul>
													</div>
												</div>
											</div>
											<div class="user-card user-card-s2">
												<div class="user-avatar md bg-primary">
													<span>{items.initials}</span>
													<div
														class={`status dot dot-lg ${items.sessions.length > 0 ? 'dot-success' : 'dot-secondary'}`}
													></div>
												</div>
												<div class="user-info">
													<h6>{items.name}</h6>
													<span class="sub-text">{items.email}</span>
												</div>
											</div>
											<div class="team-details">
												<p>{items.role?.name}</p>
											</div>
											<ul class="team-statistics">
												<li><span>{items.projects.length}</span><span>Projects</span></li>
												<li><span>87.5%</span><span>Performed</span></li>
												<li><span>{items.tasks.length}</span><span>Tasks</span></li>
											</ul>
											<div class="team-view">
												<a href="/panel/profile" class="btn btn-round btn-outline-light w-150px"
													><span>View Profile</span></a
												>
											</div>
										</div>
										<!-- .team -->
									</div>
									<!-- .card-inner -->
								</div>
								<!-- .card -->
							</div>
							<!-- .col -->
						{:else}
							<div class="col-sm-6 col-lg-4 col-xxl-3">
								Loading... <!-- ganti dengan skeleton -->
							</div>
							<!-- .col -->
						{/each}
					</div>
				</div>
				<!-- .nk-block -->
			</div>
		</div>
	</div>
</div>
<div class="modal fade" role="dialog" id="addUserData">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<a href="#" class="close" data-bs-dismiss="modal"><em class="icon ni ni-cross-sm"></em></a>
			<div class="modal-body modal-body-md">
				<div class="card card-bordered h-100">
					<div class="card-inner">
						<div class="card-head">
							<h5 class="card-title">Add User</h5>
						</div>
						<form method="post">
							<div class="form-group">
								<label class="form-label" for="cf-full-name">Full Name</label>
								<input
									type="text"
									id="cf-full-name"
									name="name"
									class="form-control"
									placeholder="Enter your full name"
									bind:value={formData.name}
								/>
								{#if formData.errors?.name}
									<div class="text-danger">{formData.errors.name}</div>
								{/if}
							</div>

							<div class="form-group">
								<label class="form-label" for="cf-email-address">Email address</label>
								<input
									type="email"
									id="cf-email-address"
									name="email"
									class="form-control"
									placeholder="Enter your email address"
									bind:value={formData.email}
								/>
								{#if formData.errors?.email}
									<div class="text-danger">{formData.errors.email}</div>
								{/if}
							</div>

							<div class="form-group">
								<label class="form-label" for="password">Password</label>
								<div class="form-control-wrap">
									<a
										tabindex="-1"
										href="#"
										class="form-icon form-icon-right passcode-switch lg"
										data-target="password"
									>
										<em class="passcode-icon icon-show icon ni ni-eye"></em>
										<em class="passcode-icon icon-hide icon ni ni-eye-off"></em>
									</a>
									<input
										type="password"
										class="form-control form-control-lg"
										id="password"
										placeholder="Enter your passcode"
										bind:value={formData.password}
									/>
								</div>
								{#if formData.errors?.password}
									<div class="text-danger">{formData.errors.password}</div>
								{/if}
							</div>
							<div class="form-group">
								<label class="form-label" for="confirm_password">Password Confirmation</label>
								<div class="form-control-wrap">
									<a
										tabindex="-1"
										href="#"
										class="form-icon form-icon-right passcode-switch lg"
										data-target="confirm_password"
									>
										<em class="passcode-icon icon-show icon ni ni-eye"></em>
										<em class="passcode-icon icon-hide icon ni ni-eye-off"></em>
									</a>
									<input
										type="confirm_password"
										class="form-control form-control-lg"
										id="confirm_password"
										placeholder="Re Enter your passcode"
										bind:value={formData.confirmPassword}
									/>
								</div>
								{#if formData.errors?.confirmPassword}
									<div class="text-danger">{formData.errors.confirmPassword}</div>
								{/if}
							</div>

							<div class="form-group">
								<label class="form-label">Select Permission</label>
								<div class="form-control-wrap">
									<select class="form-select js-select2" data-content="addUserData" name="role" bind:value={formData.roleId}>
										<option value="2">Admin</option>
										<option value="3">Developer</option>
									</select>
									{#if formData.errors?.role}
										<div class="text-danger">{formData.errors.role}</div>
									{/if}
								</div>
							</div>

							<div class="form-group">
								<button type="submit" class="btn btn-md btn-primary">Add</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
