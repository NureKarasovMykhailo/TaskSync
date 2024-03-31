import IMapper from "../IMapper";
import UserDomainModel from "../../../core/domain/models/User/User";
import User from "../../database/etities/User";
import RoleMapper from "../RoleMapper/RoleMapper";
import Role from "../../database/etities/Role";
import EducationMapper from "../EducationMapper/EducationMapper";
import EducationDomainModel from "../../../core/domain/models/Education/Education";

export default class UserMapper implements IMapper<User, UserDomainModel> {

    private readonly roleMapper: RoleMapper = new RoleMapper();
    private readonly educationMapper: EducationMapper = new EducationMapper();

    toDomainModel(data: User): UserDomainModel {
        console.log(data)
        const roles = data.roles !== null ? data.roles.map(role => this.roleMapper.toDomainModel(role)) : [];

        const educations = data.educations
            ? data.educations.map(education =>
                this.educationMapper.toDomainModel(education)) : [];

        return new UserDomainModel(
            data.id,
            data.email,
            data.firstName,
            data.secondName,
            data.password,
            data.phoneNumber,
            data.birthday,
            data.userImage,
            data.companyId,
            roles,
            educations
        );
    }

    toPersistenceModel(data: UserDomainModel): User {
        const user = new User();

        user.id = data.id;
        user.userImage = data.userImage;
        user.birthday = data.birthday;
        user.phoneNumber = data.phoneNumber;
        user.password = data.password;
        user.secondName = data.secondName;
        user.firstName = data.firstName;
        user.email = data.email;
        user.roles = data.roles.map(role => {
            return new RoleMapper().toPersistenceModel(role);
        });
        user.educations = data.educations.map(education => {
            return new EducationMapper().toPersistenceModel(education);
        })

        return user;
    }

}