package kr.megabrain.sirenorderserver.repository;

import kr.megabrain.sirenorderserver.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
