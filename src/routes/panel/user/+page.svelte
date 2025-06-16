<script lang="ts">
   export let data;
   console.log("user list : ", data);
</script>
<div class="nk-content ">
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
                                        </div><!-- .nk-block-head-content -->
                                        <div class="nk-block-head-content">
                                            <div class="toggle-wrap nk-block-tools-toggle">
                                                <a href="#" class="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em class="icon ni ni-menu-alt-r"></em></a>
                                                <div class="toggle-expand-content" data-content="pageMenu">
                                                    <ul class="nk-block-tools g-3">
                                                        <li><a href="#" class="btn btn-white btn-outline-light disabled"><em class="icon ni ni-download-cloud"></em><span>Export</span></a></li>
                                                        <li class="nk-block-tools-opt">
                                                            <div class="drodown">
                                                                <a href="#" class="dropdown-toggle btn btn-icon btn-primary" data-bs-toggle="dropdown"><em class="icon ni ni-plus"></em></a>
                                                                <div class="dropdown-menu dropdown-menu-end">
                                                                    <ul class="link-list-opt no-bdr">
                                                                        <li><a href="#region" data-bs-toggle="modal"><span>Add User</span></a></li>
                                                                        <li><a href="#" data-bs-toggle="modal"><span>Add Team</span></a></li>
                                                                        <li><a href="#" data-bs-toggle="modal"><span>Import User</span></a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div><!-- .toggle-wrap -->
                                        </div><!-- .nk-block-head-content -->
                                    </div><!-- .nk-block-between -->
                                </div><!-- .nk-block-head -->
                                <div class="nk-block">
                                    <div class="row g-gs">
                                    {#each data.allUser as items, index (index)}
                                        <div class="col-sm-6 col-lg-4 col-xxl-3">
                                            <div class="card card-bordered">
                                                <div class="card-inner">
                                                    <div class="team">
                                                        <div class={`team-status ${items.emailVerified ? 'bg-success' : 'bg-danger'} text-white`}><em class={`icon ni ${items.emailVerified ? 'ni-check' : 'ni-na'}`}></em></div>
                                                        <div class="team-options">
                                                            <div class="drodown">
                                                                <a href="#" class="dropdown-toggle btn btn-sm btn-icon btn-trigger" data-bs-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                                                                <div class="dropdown-menu dropdown-menu-end">
                                                                    <ul class="link-list-opt no-bdr">
                                                                        <li><a href="#"><em class="icon ni ni-focus"></em><span>Quick View</span></a></li>
                                                                        <li><a href="#"><em class="icon ni ni-eye"></em><span>View Details</span></a></li>
                                                                        <li><a href="#"><em class="icon ni ni-mail"></em><span>Send Email</span></a></li>
                                                                        <li class="divider"></li>
                                                                        <li><a href="#"><em class="icon ni ni-shield-star"></em><span>Reset Pass</span></a></li>
                                                                        <li><a href="#"><em class="icon ni ni-shield-off"></em><span>Reset 2FA</span></a></li>
                                                                        <li><a href="#"><em class="icon ni ni-na"></em><span>Suspend User</span></a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="user-card user-card-s2">
                                                            <div class="user-avatar md bg-primary">
                                                                <span>{items.initials}</span>
                                                                <div class={`status dot dot-lg ${items.sessions.length > 0 ? 'dot-success' : 'dot-secondary'}`}></div>
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
                                                            <a href="/panel/profile" class="btn btn-round btn-outline-light w-150px"><span>View Profile</span></a>
                                                        </div>
                                                    </div><!-- .team -->
                                                </div><!-- .card-inner -->
                                            </div><!-- .card -->
                                        </div><!-- .col -->
                                    {:else}
                                       <div class="col-sm-6 col-lg-4 col-xxl-3">
                                            Loading... <!-- ganti dengan skeleton -->
                                        </div><!-- .col -->
                                    {/each}
                                    </div>
                                </div><!-- .nk-block -->
                            </div> 
                        </div>
                    </div>
                </div>

                <div class="modal fade" tabindex="-1" role="dialog" id="region">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <a href="#" class="close" data-bs-dismiss="modal"><em class="icon ni ni-cross-sm"></em></a>
                <div class="modal-body modal-body-md">
                    <div class="card card-bordered h-100">
                                                    <div class="card-inner">
                                                        <div class="card-head">
                                                            <h5 class="card-title">Add User</h5>
                                                        </div>
                                                        <form action="#">
                                                            <div class="form-group">
                                                                <label class="form-label" for="cf-full-name">Full Name</label>
                                                                <input type="text" class="form-control" id="cf-full-name">
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="form-label" for="cf-email-address">Email address</label>
                                                                <input type="text" class="form-control" id="cf-email-address">
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="form-label" for="cf-phone-no">Phone No</label>
                                                                <input type="text" class="form-control" id="cf-phone-no">
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="form-label" for="cf-subject">Subject</label>
                                                                <input type="text" class="form-control" id="cf-subject">
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="form-label" for="cf-default-textarea">Message</label>
                                                                <div class="form-control-wrap">
                                                                    <textarea class="form-control form-control-sm" id="cf-default-textarea" placeholder="Write your message"></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <button type="submit" class="btn btn-lg btn-primary">Save Informations</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                </div>
            </div><!-- .modal-content -->
        </div><!-- .modla-dialog -->
    </div>
