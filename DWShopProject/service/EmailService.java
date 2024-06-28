package com.example.DWShopProject.service;

import com.example.DWShopProject.entity.Member;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
    private static final String FROM_EMAIL = "gpvkxhtks1@gmail.com";

    // 아이디 메일 보내기
    public void sendEmailWithMemberIds(String email, List<Member> members) {
        String title = "아이디 입니다.";
        StringBuilder contentBuilder = new StringBuilder("<p>회원님의 아이디는 아래와 같습니다:</p><ul>");

        for (Member member : members) {
            contentBuilder.append("<li>").append(member.getMemberId()).append("</li>");
        }
        contentBuilder.append("</ul>");
        String content = contentBuilder.toString();

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
            helper.setFrom(FROM_EMAIL);
            helper.setTo(email);
            helper.setSubject(title);
            helper.setText(content, true);
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 인증번호 보내기
    public void sendVerificationCode(String email, int verificationCode) {
        String subject = "회원가입 인증 이메일 입니다.";
        String content = "인증 코드는 " + verificationCode + " 입니다.<br>" +
                "해당 인증 코드를 인증 코드 확인란에 기입하여 주세요.";

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
            helper.setFrom(FROM_EMAIL);
            helper.setTo(email);
            helper.setSubject(subject);
            helper.setText(content, true);
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    //재생성된 비밀번호 보내기
    public void sendEmailWithMemberPassword(String email, int verificationCode) {
        String subject = "비밀번호 재생성 안내";
        String content = "비밀번호는 " + verificationCode + " 입니다.<br>";

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
            helper.setFrom(FROM_EMAIL);
            helper.setTo(email);
            helper.setSubject(subject);
            helper.setText(content, true);
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
