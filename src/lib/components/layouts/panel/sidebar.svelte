<script lang="ts">
   export let data;
</script>


<div class="nk-sidebar" data-content="sidebarMenu">
	<div class="nk-sidebar-bar">
		<div class="nk-apps-brand">
			<a href="/" class="logo-link">
				<img
					class="logo-light img-fluid"
					src="/pst-brand-logo-bg-none.png"
					srcset="/pst-brand-logo-bg-none.png 2x"
					alt="logo"
				/>
				<img
					class="logo-dark img-fluid"
					src="/pst-brand-logo-bg-none.png"
					srcset="/pst-brand-logo-bg-none.png 2x"
					alt="logo-dark"
				/>
			</a>
		</div>
		<div class="nk-sidebar-element">
			<div class="nk-sidebar-body">
				<div class="nk-sidebar-content" data-simplebar>
					<div class="nk-sidebar-menu">
						<!-- Menu -->
						<ul class="nk-menu apps-menu">
							<li class="nk-menu-item active">
								<a aria-label="Menu switch dashboard" href="#" class="nk-menu-link nk-menu-switch" data-target="navDashboards" data-toggle="tooltip" data-placement="right" title="Dashboard">
									<span class="nk-menu-icon"><em class="icon ni ni-dashboard"></em></span>
								</a>
							</li>
							<li class="nk-menu-hr"></li>
							<li class="nk-menu-item">
								<a aria-label="Menu switch workspace" href="#" class="nk-menu-link nk-menu-switch" data-target="navWorkspaces" data-toggle="tooltip" data-placement="right" title="Workspace">
									<span class="nk-menu-icon"><em class="icon ni ni-list-index-fill"></em></span>
								</a>
							</li>
							<li class="nk-menu-item">
								<a aria-label="Menu switch apps" href="#" class="nk-menu-link nk-menu-switch" data-target="navApps" data-toggle="tooltip" data-placement="right" title="Apps">
									<span class="nk-menu-icon"><em class="icon ni ni-puzzle-fill"></em></span>
								</a>
							</li>
							<li class="nk-menu-item">
								<a aria-label="Menu switch team" href="#" class="nk-menu-link nk-menu-switch" data-target="navTeams" data-toggle="tooltip" data-placement="right" title="Master">
									<span class="nk-menu-icon"><em class="icon ni ni-db-fill"></em></span>
								</a>
							</li>
						</ul>
					</div>
					<div class="nk-sidebar-footer">
						<ul class="nk-menu nk-menu-md apps-menu">
							<li class="nk-menu-item">
								<a aria-label="Menu switch settings" href="#" class="nk-menu-link" title="Settings">
									<span class="nk-menu-icon"><em class="icon ni ni-setting"></em></span>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="nk-sidebar-profile nk-sidebar-profile-fixed">
					<a aria-label="Menu switch profile" href="#" class="toggle" data-target="profileDD">
						<div class="user-avatar">
							<span>{data?.ak??"D"}</span>
						</div>
					</a>
					<div
						class="dropdown-menu dropdown-menu-md nk-sidebar-profile-dropdown m-1"
						data-content="profileDD"
					>
						<div class="dropdown-inner user-card-wrap d-none d-md-block">
							<div class="user-card">
								<div class="user-avatar">
									<span>{data?.ak??"U"}</span>
								</div>
								<div class="user-info">
									<span class="lead-text">{data?.name??"Anonym"}</span>
									<span class="sub-text text-soft">{data?.email??"anonym@anonym.anonym"}</span>
								</div>
							</div>
						</div>
						<div class="dropdown-inner">
							<ul class="link-list">
								<li>
									<a href="/panel/profile"
										><em class="icon ni ni-user-alt"></em><span>View Profile</span></a
									>
								</li>
								<li>
									<a href="/panel/profile/edit"	
										><em class="icon ni ni-setting-alt"></em><span>Account Setting</span></a
									>
								</li>
								<li>
									<a href="html/user-profile-activity.html"
										><em class="icon ni ni-activity-alt"></em><span>Login Activity</span></a
									>
								</li>
							</ul>
						</div>
						<div class="dropdown-inner">
							<ul class="link-list">
								<li>
									<form method="post" action="/panel/logout">
										<button type="submit" class="bg-transparent border-0">
											<em class="icon ni ni-signout"></em><span>Sign out</span>
										</button>
									</form>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="nk-sidebar-main is-light">
		<div class="nk-sidebar-inner" data-simplebar>
			<div class="nk-menu-content menu-active" data-content="navDashboards">
				<h5 class="title">Dashboards</h5>
				<ul class="nk-menu">
					<li class="nk-menu-item">
						<a href="/panel" class="nk-menu-link">
							<span class="nk-menu-icon"><em class="icon ni ni-dashboard-fill"></em></span>
							<span class="nk-menu-text">Dashboard</span>
						</a>
					</li>
					<!-- .nk-menu-item -->
				</ul>
				<!-- .nk-menu -->
			</div>
			<div class="nk-menu-content" data-content="navWorkspaces">
				<h5 class="title">Workspace</h5>
				<ul class="nk-menu">
					<li class="nk-menu-item">
						<a href="/panel/client" class="nk-menu-link">
							<span class="nk-menu-icon"><em class="icon ni ni-inbox-fill"></em></span>
							<span class="nk-menu-text">Client</span>
						</a>
					</li>
					<li class="nk-menu-item">
						<a href="/panel/project" class="nk-menu-link">
							<span class="nk-menu-icon"><em class="icon ni ni-chat-fill"></em></span>
							<span class="nk-menu-text">Project</span>
						</a>
					</li>
					<li class="nk-menu-item">
						<a href="/panel/task" class="nk-menu-link">
							<span class="nk-menu-icon"><em class="icon ni ni-folder-fill"></em></span>
							<span class="nk-menu-text">Task</span>
						</a>
					</li>
				</ul>
				<!-- .nk-menu -->
			</div>
			<div class="nk-menu-content" data-content="navApps">
				<h5 class="title">Apps</h5>
				<ul class="nk-menu">
					<!-- .nk-menu-item -->
					<li class="nk-menu-item">
						<a href="/panel/calendar" class="nk-menu-link">
							<span class="nk-menu-icon"><em class="icon ni ni-calendar-booking-fill"></em></span>
							<span class="nk-menu-text">Calendar</span>
						</a>
					</li>
				</ul>
				<!-- .nk-menu -->
			</div>
			<div class="nk-menu-content" data-content="navTeams">
				<h5 class="title">Master</h5>
				<ul class="nk-menu">
					<!-- .nk-menu-item -->
					<li class="nk-menu-item">
						<a href="/panel/user" class="nk-menu-link">
							<span class="nk-menu-icon"><em class="icon ni ni-calendar-booking-fill"></em></span>
							<span class="nk-menu-text">User</span>
						</a>
					</li>
				</ul>
				<!-- .nk-menu -->
			</div>
		</div>
	</div>
</div>
