import nodemailer from 'nodemailer';
import 'dotenv/config';

export const mailer = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: Number(process.env.MAIL_PORT),
	secure: false,
	auth: {
		user: process.env.MAIL_USERNAME,
		pass: process.env.MAIL_PASSWORD
	}
});

export const MAIL_DEFAULTS = {
	from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
	to: process.env.MAIL_TO_ADDRESS
};
