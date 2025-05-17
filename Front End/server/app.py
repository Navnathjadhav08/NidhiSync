import os
import json
import time
import urllib.request
import smtplib
from email import encoders
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
CORS(app)

def is_connected():
    try:
        urllib.request.urlopen('https://www.google.com', timeout=1)
        return True
    except Exception:
        return False

def send_email_with_bill(to_email, subject, html_body, pdf_data, pdf_filename):
    try:
        if not is_connected():
            return {"error": "No internet connection"}, 503

        start_time = time.time()
        
        # Create message container
        msg = MIMEMultipart('alternative')
        msg['From'] = os.getenv('MAIL_USERNAME')
        msg['To'] = to_email
        msg['Subject'] = subject

        # Create HTML/plain alternatives
        text_part = MIMEText("Please view this email in an HTML-compatible client", 'plain')
        html_part = MIMEText(html_body, 'html')
        msg.attach(text_part)
        msg.attach(html_part)

        # Attach PDF
        pdf_part = MIMEBase('application', 'octet-stream')
        pdf_part.set_payload(pdf_data)
        encoders.encode_base64(pdf_part)
        pdf_part.add_header('Content-Disposition', 
                          f'attachment; filename="{pdf_filename}"')
        msg.attach(pdf_part)

        # Send email
        with smtplib.SMTP(os.getenv('MAIL_SERVER'), int(os.getenv('MAIL_PORT'))) as server:
            server.starttls()
            server.login(os.getenv('MAIL_USERNAME'), os.getenv('MAIL_PASSWORD'))
            server.sendmail(msg['From'], to_email, msg.as_string())

        return {"success": True, "time": time.time() - start_time}, 200

    except Exception as e:
        return {"error": str(e)}, 500

@app.route('/api/send-bill-email', methods=['POST'])
def handle_send_email():
    try:
        # Validate input
        if 'billData' not in request.form or 'pdf' not in request.files:
            return jsonify({"error": "Missing required fields"}), 400

        # Parse data
        bill = json.loads(request.form['billData'])
        pdf_file = request.files['pdf']
        
        # Create HTML body
        html_body = f"""
        <html>
            <body>
                <h2>Dear {bill['customer']['name']},</h2>
                <p>Thank you for your purchase from {bill['shopInfo']['name']}!</p>
                <div style="margin: 20px 0;">
                    <h3>Invoice Details:</h3>
                    <ul>
                        <li>Bill Number: {bill['billNumber']}</li>
                        <li>Date: {bill['date'].split('T')[0]}</li>
                        <li>Total Amount: ₹{bill['total']:.2f}</li>
                    </ul>
                </div>
                <p>Your invoice is attached as a PDF. For any queries, contact:</p>
                <p>{bill['shopInfo']['contact']}<br>
                {bill['shopInfo']['address']}</p>
                <p style="margin-top: 30px;">Best regards,<br>
                {bill['shopInfo']['name']} Team</p>
            </body>
        </html>
        """

        # Send email
        response, status = send_email_with_bill(
            to_email=bill['customer']['email'],
            subject=f"Invoice #{bill['billNumber']} - {bill['shopInfo']['name']}",
            html_body=html_body,
            pdf_data=pdf_file.read(),
            pdf_filename=f"Invoice_{bill['billNumber']}.pdf"
        )

        return jsonify(response), status

    except json.JSONDecodeError:
        return jsonify({"error": "Invalid billData format"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)