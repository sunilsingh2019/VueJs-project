<template>
    <div class="container">
        <form @submit.prevent="setUpEmail" @keydown="form.onKeydown($event)">
            <div class="form-group row">
                <div class="col-sm-4 form-group">
                    <input v-model="form.email" type="text" name="email" placeholder="Email"
                           class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                    <has-error :form="form" field="email"></has-error>
                </div>
                <div class="col-sm-4 form-group">
                    <input v-model="form.sender_name" type="text" name="sender_name" placeholder="Sender Name"
                           class="form-control" :class="{ 'is-invalid': form.errors.has('sender_name') }">
                    <has-error :form="form" field="sender_name"></has-error>
                </div>
                <div class="col-sm-4 form-group">
                    <input v-model="form.username" type="text" name="username" placeholder="Username"
                           class="form-control" :class="{ 'is-invalid': form.errors.has('username') }">
                    <has-error :form="form" field="username"></has-error>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 b-r">
                    <h4 class="d-inline-block mb-4">Receiving Emails</h4>
                    <div class="float-right">
                        <span><img v-show="showIMAPSuccess" class="tick-icon" :src="success_img_src" alt=""></span>
                        <button id="testImap" class="btn btn-info btn-xs" @click.prevent="testIMAP"  data-style="zoom-in">Test</button>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-12">
                            <input v-model="form.imap_host" type="text" name="imap_host" placeholder="IMAP Host"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('imap_host') }">
                            <has-error :form="form" field="imap_host"></has-error>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-12">
                            <input v-model="form.imap_port" type="text" name="imap_port" placeholder="IMAP Port"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('imap_port') }">
                            <has-error :form="form" field="imap_port"></has-error>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-12 input-group">
                            <input :type="imapTextType" v-model="form.imap_password" type="password" name="imap_password" placeholder="IMAP Password"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('imap_password') }">
                            <has-error :form="form" field="imap_password"></has-error>
                            <div class="input-group-addon" @click.prevent="toggleImapTextType()" id="show_imap_password">
                                <a class="text-dark" href=""><i :class="['fa', showImapPassword ? 'fa-eye' : 'fa-eye-slash']" aria-hidden="true"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <h4 class="d-inline-block mb-4">Sending Emails</h4>
                    <div class="float-right">
                        <span><img v-show="showSMTPSuccess" class="tick-icon" :src="success_img_src" alt=""></span>
                        <button id="testSmtp" class="btn btn-info btn-xs" @click.prevent="testSMTP"  data-style="zoom-in">Test</button>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-12">
                            <input v-model="form.smtp_host" type="text" name="smtp_host" placeholder="SMTP Host"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('smtp_host') }">
                            <has-error :form="form" field="smtp_host"></has-error>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-12">
                            <input v-model="form.smtp_port" type="text" name="smtp_port" placeholder="SMTP Port"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('smtp_port') }">
                            <has-error :form="form" field="smtp_port"></has-error>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-12 input-group">
                            <input :type="smtpTextType" v-model="form.smtp_password" type="password" name="smtp_password" placeholder="SMTP Password"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('smtp_password') }">
                            <has-error :form="form" field="smtp_password"></has-error>
                            <div class="input-group-addon" @click.prevent="toggleSmtpTextType()" id="show_smtp_password">
                                <a class="text-dark" href=""><i :class="['fa', showSmtpPassword ? 'fa-eye' : 'fa-eye-slash']" aria-hidden="true"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 text-right">
                    <button type="button" @click="changeForm('')" class="btn btn-white mr-2">Back</button>
                    <button :disabled="disableContinue()" type="submit" class="btn btn-primary">Continue</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import Form from 'vform';
    export default {
        data: function() {
            return {
                isEmailProvider: "",
                success_img_src: "/img/icons/success.png",
                showIMAPSuccess: false,
                imapTextType: 'password',
                showImapPassword: false,
                showSMTPSuccess: false,
                smtpTextType: 'password',
                showSmtpPassword: false,
                form: new Form({
                    email: "",
                    sender_name: "",
                    username: "",
                    imap_host: "",
                    imap_port: "",
                    imap_password: "",
                    smtp_host: "",
                    smtp_port: "",
                    smtp_password: ""
                }),
            };
        },
        methods: {
            disableContinue(){
                if(this.showSMTPSuccess === true && this.showIMAPSuccess === true){
                    return false;
                }else{
                    // return false;
                    return true;
                }

            },
            toggleImapTextType(){
                if(this.imapTextType === 'password'){
                    this.imapTextType = 'text';
                    this.showImapPassword = true;
                }else{
                    this.imapTextType = 'password';
                    this.showImapPassword = false;
                }
            },
            toggleSmtpTextType(){
                if(this.smtpTextType === 'password'){
                    this.smtpTextType = 'text';
                    this.showSmtpPassword = true;
                }else{
                    this.smtpTextType = 'password';
                    this.showSmtpPassword = false;
                }
            },
            testSMTP(){
                var l = Ladda.create(document.querySelector('#testSmtp'));

                l.start();
                this.form.post('setting/email-account/test-smtp')
                    .then((resp) => {
                        if(resp.data.success){
                            this.showSMTPSuccess = true;
                            l.stop();
                            Swal.fire(
                                'Success!!',
                                'SMTP - Connection is Successful',
                                'success'
                            )
                        }else{
                            l.stop();
                            Swal.fire(
                                'Error!!',
                                'SMTP - '+resp.data.message,
                                'error'
                            )
                        }
                    });
            },
            testIMAP(){
                var l = Ladda.create(document.querySelector('#testImap'));

                l.start();
                this.form.post('setting/email-account/test-imap')
                    .then((resp) => {
                        if(resp.data.success){
                            this.showIMAPSuccess = true;
                            l.stop();
                            Swal.fire(
                                'Success!!',
                                'IMAP - Connection is Successful',
                                'success'
                            )
                        }else{
                            l.stop();
                            Swal.fire(
                                'Error!!',
                                'IMAP - '+resp.data.message,
                                'error'
                            )
                        }
                    });
            },
            setUpEmail(){
                this.form.post('setting/email-account')
                    .then((resp) => {
                        Swal.fire({
                            type: 'success',
                            title: 'Success!!',
                            html: 'Email Account added successfully',
                        }).then((result) => {
                            if (result.value) {
                                $('#setUpEmailModal').modal('hide');
                                this.$router.push('/dashboard/setting/email-account/');
                            }
                        });
                    });
            },
        }
    }
</script>
