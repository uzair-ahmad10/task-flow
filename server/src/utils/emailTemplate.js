import dotenv from "dotenv";
dotenv.config();

const appUrl = process.env.FRONTEND_URL;

export const emailTemplate = (name)=>{
    return `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden;">

    <!-- Header -->
    <div style="background-color: #101317; padding: 40px 30px; text-align: center;">

      <!-- Logo -->
      <div style="display: inline-block;">

        <div style="margin-bottom: 12px;">
          <span style="display: inline-block; width: 45px; height: 45px; background-color: #FFC857; border-radius: 14px; margin-right: 10px; vertical-align: middle;"></span>

          <span style="display: inline-block; width: 45px; height: 45px; background-color: #FF765C; border-radius: 14px; vertical-align: middle;"></span>
        </div>

        <div>
          <span style="display: inline-block; width: 45px; height: 45px; background-color: #A77CF0; border-radius: 14px; margin-right: 10px; vertical-align: middle;"></span>

          <span style="display: inline-block; width: 45px; height: 45px; background-color: #D8E64E; border-radius: 14px; vertical-align: middle;"></span>
        </div>

      </div>

      <h1 style="margin: 25px 0 8px 0; color: #ffffff; font-size: 28px; line-height: 36px; font-weight: 700;">
        TaskFlow
      </h1>

      <p style="margin: 0; color: #aeb4bd; font-size: 15px; line-height: 24px;">
        Organize your work. Get things done.
      </p>

    </div>

    <!-- Main Content -->
    <div style="padding: 40px;">

      <p style="margin: 0 0 10px 0; color: #555555; font-size: 16px; line-height: 26px;">
        Hi <strong style="color: #222222;">${name}</strong>,
      </p>

      <h2 style="margin: 0 0 18px 0; color: #16181c; font-size: 30px; line-height: 38px; font-weight: 700;">
        Welcome to TaskFlow! 👋
      </h2>

      <p style="margin: 0 0 18px 0; color: #555555; font-size: 16px; line-height: 27px;">
        We're excited to have you here. TaskFlow helps you organize your
        tasks, manage your projects, and keep your work moving forward.
      </p>

      <p style="margin: 0 0 30px 0; color: #555555; font-size: 16px; line-height: 27px;">
        Start by creating your first task and take the first step toward
        getting more done.
      </p>

      <!-- CTA Button -->
      <div style="text-align: left; margin: 30px 0 40px 0;">
        <a
          href="${appUrl}"
          target="_blank"
          style="display: inline-block; padding: 15px 28px; background-color: #101317; color: #ffffff; text-decoration: none; font-size: 16px; line-height: 20px; font-weight: 600; border-radius: 10px;"
        >
          Get Started →
        </a>
      </div>

      <!-- Features -->
      <div style="border-top: 1px solid #eeeeee; padding-top: 30px;">

        <div style="display: inline-block; width: 31%; vertical-align: top; margin-right: 1%;">

          <div style="margin-bottom: 8px; color: #101317; font-size: 24px; line-height: 28px;">
            ✓
          </div>

          <strong style="display: block; margin-bottom: 5px; color: #222222; font-size: 14px; line-height: 20px;">
            Manage Tasks
          </strong>

          <span style="color: #777777; font-size: 13px; line-height: 20px;">
            Keep your tasks organized.
          </span>

        </div>

        <div style="display: inline-block; width: 31%; vertical-align: top; margin: 0 1%;">

          <div style="margin-bottom: 8px; color: #101317; font-size: 24px; line-height: 28px;">
            ◷
          </div>

          <strong style="display: block; margin-bottom: 5px; color: #222222; font-size: 14px; line-height: 20px;">
            Stay on Track
          </strong>

          <span style="color: #777777; font-size: 13px; line-height: 20px;">
            Keep an eye on deadlines.
          </span>

        </div>

        <div style="display: inline-block; width: 31%; vertical-align: top; margin-left: 1%;">

          <div style="margin-bottom: 8px; color: #101317; font-size: 24px; line-height: 28px;">
            ★
          </div>

          <strong style="display: block; margin-bottom: 5px; color: #222222; font-size: 14px; line-height: 20px;">
            Get Things Done
          </strong>

          <span style="color: #777777; font-size: 13px; line-height: 20px;">
            Turn your plans into progress.
          </span>

        </div>

      </div>

    </div>

    <!-- Footer -->
    <div style="padding: 25px 30px; background-color: #f8f8f8; border-top: 1px solid #eeeeee; text-align: center;">

      <p style="margin: 0 0 8px 0; color: #777777; font-size: 13px; line-height: 20px;">
        You're receiving this email because you created an account with TaskFlow.
      </p>

      <p style="margin: 0; color: #999999; font-size: 12px; line-height: 18px;">
        © 2026 TaskFlow. All rights reserved.
      </p>

    </div>

  </div>
`
}