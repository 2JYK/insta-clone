# 📌 Git - Commit message convention

태그는 다음과 같은 종류로 구분됩니다. 태그 뒤에는 " : "를 붙여 제목과 구별할 수 있도록 합니다.
1. 기능
2. 개선
3. 그 외

### 1. Commit Message Structure
```
Type: Subject
Body
Footer
```

### 2. Commit Type
- Feat: 새로운 기능 추가/수정/삭제
- Fix: 버그 수정
- Docs: 문서 수정
- Design : CSS 등 사용자 UI 디자인 변경
- Style: 코드에 영향을 주지 않는 변경사항 /  코드 포맷 변경, 새미 콜론 누락, 코드 수정이 없는 경우
- Comment : 필요한 주석 추가 및 변경
- Refactor: 코드 리팩토링
- Test: 테스트 코드/기능 추가
- Chore: 기타 변경사항, 패키지 매니저 수정
- !BREAKING CHANGE : API를 크게 변경하는 경우
- Rename : 파일 혹은 폴더명ㅇ르 수정하거나 옮기는 작업만인 경우
- Remove : 파일을 삭제하는 작업만 수행한 경우

### 3. Subject
- 50자를 넘기지 않고, 커밋 타입을 준수함.

### 4. Body
- 72자를 넘기지 않고, 모든 커밋에 본문 내용을 작성할 필요는 없음.

### 5. Footer
- 모든 커밋에 꼬리말을 작성할 필요는 없음.
- Issue tracker ID를 작성할 때, 사용함.

### 6. Example
```
Feat: GameManager 추가

Singletone을 추가함.

Resolves: #123
See also: #456, #789
```