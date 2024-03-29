import IMapper from "../IMapper";
import UserDomainModel from "../../../core/domain/models/User/User";
import User from "../../database/etities/User";
import RoleMapper from "../RoleMapper/RoleMapper";
import Role from "../../database/etities/Role";

export default class UserMapper implements IMapper<User, UserDomainModel> {

    private readonly roleMapper = new RoleMapper();

    toDomainModel(data: User): UserDomainModel {
        const roles = data.roles ? data.roles.map(role => this.roleMapper.toDomainModel(role)) : [];
        return new UserDomainModel(
            data.id,
            data.email,
            data.firstName,
            data.secondName,
            data.password,
            data.phoneNumber,
            data.birthday,
            data.userImage,
            //data.company,
            roles,
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

        return user;
    }

}