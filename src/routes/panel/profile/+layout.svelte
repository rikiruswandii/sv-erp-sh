<script lang="ts">
	import type { LayoutData } from './$types';

	let { data, children } = $props<{ data: LayoutData }>();
	console.log("layout profile : ", data);
</script>

<div class="nk-content">
	<div class="container-fluid">
		<div class="nk-content-inner">
			<div class="nk-content-body">
				<div class="nk-block">
					<div class="card card-bordered">
						<div class="card-aside-wrap">
							<!-- children -->
                            {@render children()}
							<div
								class="card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg"
								data-toggle-body="true"
								data-content="userAside"
								data-toggle-screen="lg"
								data-toggle-overlay="true"
							>
								<div class="card-inner-group" data-simplebar>
									<div class="card-inner">
										<div class="user-card">
											<div class="user-avatar bg-primary">
												<span>AB</span>
											</div>
											<div class="user-info">
												<span class="lead-text">{data.user.name}</span>
												<span class="sub-text">{data.user.email}</span>
											</div>
											<div class="user-action">
												<div class="dropdown">
													<a
														class="btn btn-icon btn-trigger me-n2"
														data-bs-toggle="dropdown"
														href="#"><em class="icon ni ni-more-v"></em></a
													>
													<div class="dropdown-menu dropdown-menu-end">
														<ul class="link-list-opt no-bdr">
															<li>
																<a href="#"
																	><em class="icon ni ni-camera-fill"></em><span>Change Photo</span
																	></a
																>
															</li>
															<li>
																<a href="#"
																	><em class="icon ni ni-edit-fill"></em><span>Update Profile</span
																	></a
																>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
										<!-- .user-card -->
									</div>
									<!-- .card-inner -->
									<div class="card-inner">
										<div class="user-account-info py-0">
											<h6 class="overline-title-alt">Nio Wallet Account</h6>
											<div class="user-balance">
												12.395769 <small class="currency currency-btc">BTC</small>
											</div>
											<div class="user-balance-sub">
												Locked <span>0.344939 <span class="currency currency-btc">BTC</span></span>
											</div>
										</div>
									</div>
									<!-- .card-inner -->
									<div class="card-inner p-0">
										<ul class="link-list-menu">
											<li>
												<a class="active" href="html/user-profile-regular.html"
													><em class="icon ni ni-user-fill-c"></em><span>Personal Infomation</span
													></a
												>
											</li>
											<li>
												<a href="html/user-profile-notification.html"
													><em class="icon ni ni-bell-fill"></em><span>Notifications</span></a
												>
											</li>
											<li>
												<a href="html/user-profile-activity.html"
													><em class="icon ni ni-activity-round-fill"></em><span
														>Account Activity</span
													></a
												>
											</li>
											<li>
												<a href="html/user-profile-setting.html"
													><em class="icon ni ni-lock-alt-fill"></em><span>Security Settings</span
													></a
												>
											</li>
											<li>
												<a href="html/user-profile-social.html"
													><em class="icon ni ni-grid-add-fill-c"></em><span
														>Connected with Social</span
													></a
												>
											</li>
										</ul>
									</div>
									<!-- .card-inner -->
								</div>
								<!-- .card-inner-group -->
							</div>
							<!-- card-aside -->
						</div>
						<!-- .card-aside-wrap -->
					</div>
					<!-- .card -->
				</div>
				<!-- .nk-block -->
			</div>
		</div>
	</div>
</div>
